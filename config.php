<?php
// กำหนดข้อมูลการเชื่อมต่อฐานข้อมูล MySQL
define('DB_SERVER', 'localhost'); 
define('DB_USERNAME', 'root'); 
define('DB_PASSWORD', ''); // แก้จาก 'root' เป็น 'รหัสผ่านว่างเปล่า'
define('DB_NAME', 'webshop1');

// สร้างการเชื่อมต่อ
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    // ถ้าเชื่อมต่อไม่ได้ ให้หยุดการทำงานและแสดงข้อความ
    die("ERROR: ไม่สามารถเชื่อมต่อฐานข้อมูลได้. " . $conn->connect_error);
}

// ตั้งค่าให้เชื่อมต่อรองรับภาษาไทย
$conn->set_charset("utf8mb4");

// สำหรับการใช้งานจริง ควรมีการจัดการ error ที่ซับซ้อนกว่านี้
?>