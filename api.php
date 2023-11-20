<?php
include "db_config.php";
include "WarehouseDatabase.php";
try {
  // Connect to the database
  $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>
