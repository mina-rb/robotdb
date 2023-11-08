<?php
include "db_config.php";
include "classes/WarehouseDatabase.php";
$sql = "SELECT * FROM PRODUCT";
$result = WarehouseDatabase::getDataFromSQL($sql);
print_r($result);
?>