<?php

// include_once "src/routes/Router.php";
include_once "src/connection/Config.php";

require_once "vendor/autoload.php";

use src\routes\Router;

header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS"); 
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(200);
    exit;
}
  
$uri = $_SERVER['REQUEST_URI'];


$request = $_SERVER["REQUEST_METHOD"];

/* Routes */
$router = new Router($uri, $request);

?>
