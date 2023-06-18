<?php

namespace src\connection;

use src\connection\Config;

class Connection {
    // Stores connection and PDO in attribute
    private $sql;
    
    // Database connection
    public function __construct(){

        $connect = "pgsql:host=".Config::HOST. ";dbname=".Config::DATABASE;  
        $connection = new \PDO($connect, Config::USERNAME, Config::PASSWORD);

        $this->sql = $connection;
    }

    public function getSql() {
        return $this->sql;
    }
}

?>