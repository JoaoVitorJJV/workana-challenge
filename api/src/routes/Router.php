<?php
namespace src\routes;
/* 
    This file contains all the API route control, with support for slugs, 
    GET parameters, and others. To create a new route, add a new item to the 
    routes array, using the URI as the KEY and an array as the VALUE. The array 
    should have the HTTP request type as the KEY and another array as the VALUE, 
    containing the controller and the method for redirection.
*/

use src\controllers\AuthController;
use src\controllers\ProductController;
use src\controllers\Handler\ProductHandler;

class Router
{
    public function __construct($url, $request)
    {
        header("Content-Type: application/json; charset=utf-8");

        $routes = [
            "/signin" => [
                "POST" => [AuthController::class, "signin"],
            ],
            "/signup" => [
                "POST" => [AuthController::class, "signup"],
            ],
            "/products" => [
                "GET" => [ProductController::class, "getProducts"],
            ],
            "/product/create" => [
                "POST" => [ProductController::class, "createProduct"],
            ],
            "/product/sale/create" => [
                "POST" => [ProductController::class, "createSale"],
            ],
            "/producttype/create" => [
                "POST" => [ProductController::class, "createProductType"],
            ],
            "/producttype" => [
                "GET" => [ProductController::class, "getProductsType"],
            ],
        ];

        if ($request == "GET") {
            $sanitizeRoute = explode("?", $url);

            if (count($sanitizeRoute) > 1) {
                $queryParameters = $sanitizeRoute[1];
                $url = $sanitizeRoute[0];
            }
        }

        foreach ($routes as $route => $methods) {
            $pattern = preg_replace("/:(\w+)/", "(\w+)", $route);
            $pattern = "@^$pattern$@D";

            if (preg_match($pattern, $url, $matches)) {
                if (array_key_exists($request, $methods)) {
                    $controller = $methods[$request][0];
                    $action = $methods[$request][1];
            
                    $controllerInstance = new $controller();

                    if (count($matches) > 1) {
                        $controllerInstance->$action($matches[1]);
                    } else {
                        $controllerInstance->$action();
                    }
                    return;
                } else {
                    http_response_code(405);
                    echo json_encode(["error" => "Bad Request."]);
                    die();
                }
            }
        }
        http_response_code(404);
        echo json_encode(["error" => "Not Found"]);
    }
}
