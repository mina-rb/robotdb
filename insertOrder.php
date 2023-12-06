<?php
include "db_config.php";
include "WarehouseDatabase.php";

header('Content-Type: application/json'); // Indicate that we're returning JSON

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['selection1'], $_POST['selection2'])) {
        $productId = $_POST['selection1'];
        $locationId = $_POST['selection2'];

        // Check for both placeholder values and empty values.
        if ($productId === 'Select Product' || empty($productId) || 
            $locationId === 'Select Location' || empty($locationId)) {
            echo json_encode(['error' => "Invalid selection for Product or Location."]);
            return; // Stop script execution after error
        }

        date_default_timezone_set('America/New_York');
        $orderedOn = date('Y-m-d H:i');

        try {
            WarehouseDatabase::connect();

            $sql = "INSERT INTO orders (productId, locationId, orderedOn)
                    VALUES (:productId, :locationId, :orderedOn)";
            $params = array(
                ':productId' => $productId,
                ':locationId' => $locationId,
                ':orderedOn' => $orderedOn
            );

            WarehouseDatabase::startTransaction();
            WarehouseDatabase::executeSQL($sql, $params);
            WarehouseDatabase::commitTransaction();

            echo json_encode(['success' => "Order placed successfully."]);
        } catch (Exception $e) {
            WarehouseDatabase::rollbackTransaction();
            echo json_encode(['error' => "Error placing order: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(['error' => "Selections for Product or Location are missing."]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => "Method Not Allowed"]);
}
?>
