<?php

use PHPUnit\Framework\TestCase;
use src\controllers\AuthController;
use src\controllers\handler\UserHandler;

class AuthControllerTest extends TestCase
{
    public function testSignin ()
    {
        // Simulate request data

        $email = "example@example.com";
        $password = "12343";

        $reqData = [
            'email' => "example@example.com",
            'password' => "12343"
        ];

        // Simulate the ProductHandler object using Mock
        // $handlerMock = $this->createMock(ProductHandler::class);
        $handlerMock = $this->getMockBuilder(UserHandler::class)
            ->disableOriginalConstructor()
            ->getMock();

        // Set expectations for the methods called on the simulated handler
        $handlerMock
            ->expects($this->any())
            ->method("signin")
            ->with($email, $password);

        $controller = new AuthController();
        // Execute the signin() method
        $controller->setHandler($handlerMock);
        $controller->setReq($reqData);
        $controller->signin();

        // Verify the expected output (optional)
        $expectedOutput = json_encode([
            "error" => false, "user" => null
        ]);
        $this->expectOutputString($expectedOutput);
    }

    public function testSignup()
    {
        // Simulate request data

        $reqData = [
            "name" => "Name Example",
            'email' => "example@example.com",
            'password' => "12343",
        ];

        // Simulate the ProductHandler object using Mock
        // $handlerMock = $this->createMock(ProductHandler::class);
        $handlerMock = $this->getMockBuilder(UserHandler::class)
            ->disableOriginalConstructor()
            ->getMock();

        // Set expectations for the methods called on the simulated handler
        $handlerMock
            ->expects($this->any())
            ->method("signup")
            ->with($reqData);

        $controller = new AuthController();
        // Execute the signin() method
        $controller->setHandler($handlerMock);
        $controller->setReq($reqData);
        $controller->signup();

        // Verify the expected output (optional)
        $expectedOutput = json_encode([
            "error" => false, "user" => null
        ]);
        $this->expectOutputString($expectedOutput);
    }

}