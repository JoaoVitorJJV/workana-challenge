<?php

use PHPUnit\Framework\TestCase;
use src\controllers\AuthController;
use src\controllers\ProductController;
use src\routes\Router;

class RouterTest extends TestCase
{
    public function testRouteExists()
    {
        $url = '/';
        $request = 'GET';

        $productControllerMock = $this->createMock(ProductController::class);
        $productControllerMock->expects($this->never())
            ->method('getProducts');

        $router = new Router($url, $request);
        
        $expectedOutput = json_encode(['error' => 'Not Found']);
        $this->expectOutputString($expectedOutput);
    }

    public function testRouteNotFound()
    {
        $url = '/nonexistent';
        $request = 'GET';

        $authControllerMock->expects($this->never())
            ->method('index');

        $productControllerMock = $this->createMock(ProductController::class);
        $productControllerMock->expects($this->never())
            ->method('getProducts');

        $router = new Router($url, $request);
        
        $expectedOutput = json_encode(['error' => 'Not Found']);
        $this->expectOutputString($expectedOutput);
    }

    public function testRouteMethodNotAllowed()
    {
        $url = '/products';
        $request = 'POST';

        $router = new Router($url, $request);
        
        $expectedOutput = json_encode(['error' => 'Bad Request.']);
        $this->expectOutputString($expectedOutput);
    }
}