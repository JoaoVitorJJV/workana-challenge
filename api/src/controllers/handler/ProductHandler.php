<?php
namespace src\controllers\handler;

use src\connection\Connection;

class ProductHandler {
    private $instance;

    public function __construct(){
        $connection = new Connection();
        $this->instance = $connection->getSql();
        
    }

    public function createProduct($data){
        $query = "INSERT INTO products (name, supplier, batch, product_type_id, price, quantity, created_at, updated_at) VALUES (:name, :supplier, :batch, :product_type_id, :price, :quantity, :created_at, :updated_at)";

        $timestamps = $this->getCurrentDatetime();
        $sql = $this->instance->prepare($query);
        $sql->bindValue(':name', $data['name']);
        $sql->bindValue(':supplier', $data['supplier']);
        $sql->bindValue(':batch', empty($data['batch']) ? null : $data['batch']);
        $sql->bindValue(':product_type_id', $data['product_type_id']);
        $sql->bindValue(':price', $data['unit_price']);
        $sql->bindValue(':quantity', $data['quantity']);
        $sql->bindValue(':created_at', $timestamps);
        $sql->bindValue(':updated_at', $timestamps);
        $sql->execute();
    }

    public function createProductType ($data){
        $query = "INSERT INTO products_type (name, tax) VALUES (:name, :tax)";
        
        $sql = $this->instance->prepare($query);
        $sql->bindValue(':name', $data['name']);
        $sql->bindValue(':tax', $data['tax']);
        $sql->execute();
    }

    public function createSale($data) {
        $query = "INSERT INTO sales (created_at, product_id, user_id, price) VALUES (:created_at, :product_id, :user_id, :price)";

        $sql = $this->instance->prepare($query);
        $sql->bindValue(':created_at', $data['datetime']);
        $sql->bindValue(':product_id', $data['product_id']);
        $sql->bindValue(':user_id', $data['user_id']);
        $sql->bindValue(':price', $data['price']);
        $sql->execute();

    }


    public function getProductTypeFromId($id) {
        $query = "SELECT id FROM products_type WHERE id = :id LIMIT 1";

        $sql = $this->instance->prepare($query);
        $sql->bindValue(':id', $id);
        $sql->execute();

        $result = $sql->fetch(\PDO::FETCH_ASSOC);
        return $result;
    }

    public function getProductFromName($name){
        $query = "SELECT id FROM products WHERE name = :name LIMIT 1";

        $sql = $this->instance->prepare($query);
        $sql->bindValue(':name', $name);
        $sql->execute();

        $result = $sql->fetch(\PDO::FETCH_ASSOC);

        return $result;
    }

    public function getProductTypeFromName($name){
        $query = "SELECT id FROM products_type WHERE name = :name LIMIT 1";

        $sql = $this->instance->prepare($query);
        $sql->bindValue(':name', $name);
        $sql->execute();

        $result = $sql->fetch(\PDO::FETCH_ASSOC);

     
        return $result;
    }

    public function getProductsType() {
        $query = "SELECT * FROM products_type";

        $sql = $this->instance->prepare($query);
        $sql->execute();

        $results = $sql->fetchAll(\PDO::FETCH_ASSOC);

        return $results;
    }

    public function getProductFromId($id) {
        $query = "SELECT id FROM products WHERE id = :id LIMIT 1";

        $sql = $this->instance->prepare($query);
        $sql->bindValue(':id', $id);
        $sql->execute();

        $result = $sql->fetch(\PDO::FETCH_ASSOC);

        return $result;
    }

    public function getProducts () {
        $query = "
        SELECT 
            products.id,
            products.name,
            products.quantity,
            products.supplier,
            products.price,
            products_type.name AS product_type_name,
            products_type.tax AS product_type_tax
        FROM 
            products
        JOIN 
            products_type ON products.product_type_id = products_type.id;
        ";

        $sql = $this->instance->prepare($query);
        $sql->execute();

        $results = $sql->fetchAll(\PDO::FETCH_ASSOC);

        return $results;
    }


    private function getCurrentDatetime() {
        $date = new \Datetime();

        return $date->format('Y-m-d H:i:s');
    }


}