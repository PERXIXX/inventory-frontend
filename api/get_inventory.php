<?php
header("Content-Type: application/json; charset=utf-8");

// โหลด config.php แบบไม่พัง
require_once(__DIR__ . '/../config.php');

// CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$retailer_id = isset($_GET['retailer_id']) ? intval($_GET['retailer_id']) : 0;

if ($retailer_id <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid retailer ID"]);
    exit;
}

$sql = "SELECT sku_id, product_name, price, current_stock 
        FROM products 
        WHERE retailer_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $retailer_id);
$stmt->execute();
$result = $stmt->get_result();

$inventory = [];
while ($row = $result->fetch_assoc()) {
    $inventory[] = $row;
}

echo json_encode([
    "success" => true,
    "inventory" => $inventory
]);

$stmt->close();
$conn->close();
