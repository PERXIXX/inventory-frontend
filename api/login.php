<?php
require_once(__DIR__ . '/../config.php');
// ใส่ไว้บนสุดของไฟล์ PHP
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
// ตั้งค่า Header เฉพาะ
header("Access-Control-Allow-Methods: POST");

$data = json_decode(file_get_contents("php://input"));

if (empty($data->username) || empty($data->password)) {
    echo json_encode(['success' => false, 'message' => 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน']);
    exit;
}

$username = $conn->real_escape_string($data->username);
$password = $data->password; // รหัสผ่านที่ผู้ใช้ป้อน

$sql = "SELECT retailer_id, password_hash, shop_name, role FROM retailers WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if ($row) {
    // ในระบบจริง: ต้องใช้ password_verify($password, $row['password_hash'])
    // ในระบบทดสอบ: ใช้การเทียบสตริงธรรมดา
    if ($password === $row['password_hash']) { 
        echo json_encode([
            'success' => true,
            'retailer_id' => $row['retailer_id'],
            'role' => $row['role'],
            'shop_name' => $row['shop_name'],
            'message' => 'เข้าสู่ระบบสำเร็จ'
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'รหัสผ่านไม่ถูกต้อง']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'ไม่พบผู้ใช้']);
}

$stmt->close();
$conn->close();
?>