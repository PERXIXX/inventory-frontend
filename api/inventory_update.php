<?php
require_once('../config.php');
// ใส่ไว้บนสุดของไฟล์ PHP
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
header("Access-Control-Allow-Methods: POST");

$data = json_decode(file_get_contents("php://input"));

if (empty($data->retailer_id) || empty($data->transaction_type) || empty($data->product_sku) || empty($data->quantity)) {
    http_response_code(400); 
    echo json_encode(['success' => false, 'message' => 'ข้อมูลไม่สมบูรณ์']);
    exit;
}

$retailer_id = (int)$data->retailer_id;
$type = $conn->real_escape_string($data->transaction_type);
$sku = $conn->real_escape_string($data->product_sku);
$quantity = (int)$data->quantity;

if ($quantity <= 0) {
    http_response_code(400); 
    echo json_encode(['success' => false, 'message' => 'จำนวนต้องมากกว่าศูนย์']);
    exit;
}

// 1. เริ่มต้น Database Transaction
$conn->begin_transaction();
try {
    $operator = ($type == 'OUT') ? '-' : '+';
    
    // a) อัปเดตสต๊อกในตาราง inventory
    $sql_update = "UPDATE inventory 
                   SET current_stock = current_stock {$operator} ? 
                   WHERE retailer_id = ? AND sku_id = ?";
    
    $stmt_update = $conn->prepare($sql_update);
    $stmt_update->bind_param("iis", $quantity, $retailer_id, $sku);
    
    if (!$stmt_update->execute()) {
        throw new Exception("Error updating inventory.");
    }
    
    // ตรวจสอบผลกระทบ (เช็คว่ามีแถวถูกอัปเดตหรือไม่)
    if ($stmt_update->affected_rows === 0) {
        // หากไม่มีแถวถูกอัปเดต อาจหมายถึงสินค้านั้นไม่มีอยู่ในสต๊อกของผู้ค้าคนนี้
        throw new Exception("ไม่พบสินค้านี้ในสต๊อกของผู้ค้า. (Retailer/SKU mismatch)");
    }

    // b) ตรวจสอบสต๊อกคงคลัง (สำคัญสำหรับ OUT)
    if ($type == 'OUT') {
        $sql_check = "SELECT current_stock FROM inventory WHERE retailer_id = ? AND sku_id = ?";
        $stmt_check = $conn->prepare($sql_check);
        $stmt_check->bind_param("is", $retailer_id, $sku);
        $stmt_check->execute();
        $result_check = $stmt_check->get_result();
        
        if ($row = $result_check->fetch_assoc()) {
            if ($row['current_stock'] < 0) {
                throw new Exception("สต๊อกคงเหลือไม่เพียงพอ.");
            }
        }
    }

    // c) บันทึกรายการเคลื่อนไหวในตาราง transactions
    $sql_insert = "INSERT INTO transactions (retailer_id, sku_id, type, quantity) 
                   VALUES (?, ?, ?, ?)";
    
    $stmt_insert = $conn->prepare($sql_insert);
    $stmt_insert->bind_param("issi", $retailer_id, $sku, $type, $quantity);
    
    if (!$stmt_insert->execute()) {
        throw new Exception("Error inserting transaction.");
    }

    // ถ้าทุกอย่างสำเร็จ ให้ยืนยัน Transaction
    $conn->commit();
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'บันทึกรายการสำเร็จ']);

} catch (Exception $e) {
    // ถ้ามี Error ให้ยกเลิก Transaction
    $conn->rollback();
    http_response_code(500); 
    echo json_encode(['success' => false, 'message' => 'บันทึกรายการล้มเหลว', 'error' => $e->getMessage()]);
}

$conn->close();
?>