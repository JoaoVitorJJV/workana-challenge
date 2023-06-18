<?php

use PHPUnit\Framework\TestCase;
use src\connection\Connection;
use src\connection\Config;

class ConnectionTest extends TestCase
{
    public function testConnection()
    {
        // Set connection credentials for the test
        $host = 'localhost';
        $database = 'test_db';
        $username = 'test_user';
        $password = 'test_password';

        // Create an instance of the Config class with test credentials
        $config = new Config($host, $database, $username, $password);

        // Create an instance of the Connection class
        $connection = new Connection($config);

        // Check if the connection has been established correctly
        $this->assertInstanceOf(\PDO::class, $connection->getSql());
    }
}
