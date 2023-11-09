<?php
include "db_config.php";
include "classes/WarehouseDatabase.php";
$sql = "SELECT * FROM product";
$result = WarehouseDatabase::getDataFromSQL($sql);
print_r($result);
?>