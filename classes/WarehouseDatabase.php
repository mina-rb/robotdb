<?php

class WarehouseDatabase {
    private static $connection;

    public static function connect() {
        // Assume $dbhost, $dbuser, $dbpass, and $dbname are defined in db_config.php
        // which is included in insertOrder.php before the instantiation of WarehouseDatabase.
        include "db_config.php"; // Including database configuration
        try {
            self::$connection = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
            // Set the PDO error mode to exception
            self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            throw new Exception("Connection failed: " . $e->getMessage());
        }
    }

    public static function executeSQL($sql, $params = []) {
        try {
            $stmt = self::$connection->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch(PDOException $e) {
            throw new Exception("Database error: " . $e->getMessage());
        }
    }

    public static function startTransaction() {
        self::$connection->beginTransaction();
    }

    public static function commitTransaction() {
        self::$connection->commit();
    }

    public static function rollbackTransaction() {
        self::$connection->rollBack();
    }

    public static function getLastInsertedId() {
        return self::$connection->lastInsertId();
    }

    // Add any other methods relevant to the WarehouseDatabase operations here
}

?>
