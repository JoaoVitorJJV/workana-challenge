<?php

use PHPUnit\Framework\TestCase;
use src\controllers\ProductController;
use src\controllers\handler\ProductHandler;
use src\controllers\handler\UserHandler;

class ProductControllerTest extends TestCase
{
    public function testCreateProduct()
    {
        // Simulate request data
        $reqData = [
            "name" => "Example Product",
            "supplier" => "Example Supplier",
            "batch" => "Example Batch",
            "product_type_id" => 1,
            "unit_price" => 10.99,
            "quantity" => 5,
        ];

        // Simulate the ProductHandler object using Mock
        // $handlerMock = $this->createMock(ProductHandler::class);
        $handlerMock = $this->getMockBuilder(ProductHandler::class)
            ->disableOriginalConstructor()
            ->getMock();

        // Set expectations for the methods called on the simulated handler
        $handlerMock
            ->expects($this->any())
            ->method("getProductTypeFromId")
            ->with($this->identicalTo(1))
            ->willReturn(["id" => 1]);
        $handlerMock
            ->expects($this->any())
            ->method("getProductFromName")
            ->with("Example Product")
            ->willReturn(["id" => 1]);
        $handlerMock
            ->expects($this->any())
            ->method("createProduct")
            ->with([
                "name" => "Example Product",
                "supplier" => "Example Supplier",
                "batch" => "Example Batch",
                "product_type_id" => "1",
                "unit_price" => "10.99",
                "quantity" => "5",
            ]);

        $controller = new ProductController();
        // Execute the createProduct() method
        $controller->setHandler($handlerMock);
        $controller->setReq($reqData);
        $controller->createProduct();

        // Verify the expected output (optional)
        $expectedOutput = json_encode([
            "error" => "A product with the same name already exists",
        ]);
        $this->expectOutputString($expectedOutput);
    }

    public function testCreateProductType()
    {
        // Simulate request data
        $reqData = [
            "name" => "Example Product",
            "tax" => 1.0,
        ];

        // Simulate the ProductHandler object using Mock
        // $handlerMock = $this->createMock(ProductHandler::class);
        $handlerMock = $this->getMockBuilder(ProductHandler::class)
            ->disableOriginalConstructor()
            ->getMock();

        // Set expectations for the methods called on the simulated handler
        $handlerMock
            ->expects($this->any())
            ->method("getProductTypeFromName")
            ->with("Example Product")
            ->willReturn(["id" => 1]);
        $handlerMock
            ->expects($this->any())
            ->method("createProductType")
            ->with([
                "name" => "Example Product",
                "tax" => 1.0,
            ]);

        $controller = new ProductController();
        // Execute the createProductType() method
        $controller->setHandler($handlerMock);
        $controller->setReq($reqData);
        $controller->createProductType();

        // Verify the expected output (optional)
        $expectedOutput = json_encode([
            "error" => "A product type with the same name already exists",
        ]);
        $this->expectOutputString($expectedOutput);
    }

    public function testGetProductsType()
    {
        // Simulate response data
        $resData = [
            ["id" => 1, "name" => "Type 1", "Tax" => 1],
            ["id" => 2, "name" => "Type 2", "Tax" => 1],
            ["id" => 3, "name" => "Type 3", "Tax" => 1],
        ];

        // Simulate the ProductHandler object using Mock
        $handlerMock = $this->getMockBuilder(ProductHandler::class)
            ->disableOriginalConstructor()
            ->getMock();

        // Set expectations for the methods called on the simulated handler
        $handlerMock
            ->expects($this->any())
            ->method("getProductsType")
            ->willReturn($resData);

        $controller = new ProductController();
        // Execute the getProductsType() method
        $controller->setHandler($handlerMock);
        $controller->getProductsType();

        // Verify the expected output (optional)
        $expectedOutput = json_encode([
            "error" => false,
            "productsType" => $resData,
        ]);
        $this->expectOutputString($expectedOutput);
    }

    public function testGetProducts()
    {
        // Simulate response data
        $resData = [
            [
                "id" => 1,
                "name" => "Example Product",
                "supplier" => "Example Supplier",
            ],
            [
                "id" => 1,
                "name" => "Example Product",
                "supplier" => "Example Supplier",
            ],
            [
                "id" => 1,
                "name" => "Example Product",
                "supplier" => "Example Supplier",
            ],
        ];

        // Simulate the ProductHandler object using Mock
        $handlerMock = $this->getMockBuilder(ProductHandler::class)
            ->disableOriginalConstructor()
            ->getMock();

        // Set expectations for the methods called on the simulated handler
        $handlerMock
            ->expects($this->any())
            ->method("getProducts")
            ->willReturn($resData);

        $controller = new ProductController();
        // Execute the createProduct() method
        $controller->setHandler($handlerMock);
        $controller->getProducts();

        // Verify the expected output (optional)
        $expectedOutput = json_encode([
            "error" => false,
            "products" => $resData,
        ]);
        $this->expectOutputString($expectedOutput);
    }

    public function testCreateSale()
    {
        // Simulate request data
        $reqData = [
            "product_id" => 1,
            "user_id" => 1,
            "price" => 1.00,
            "datetime" => "2023-02-01",
            "quantity" => 1,
        ];

        // Simulate the ProductHandler object using Mock
        // $handlerMock = $this->createMock(ProductHandler::class);
        $handlerMock = $this->getMockBuilder(ProductHandler::class)
            ->disableOriginalConstructor()
            ->getMock();
        
        $userHandlerMock = $this->getMockBuilder(UserHandler::class)
            ->disableOriginalConstructor()
            ->getMock();

        // Set expectations for the methods called on the simulated handler
        $handlerMock
            ->expects($this->any())
            ->method("getProductFromId")
            ->with($this->identicalTo(1))
            ->willReturn(["id" => 1]);
        $userHandlerMock
            ->expects($this->any())
            ->method("getUserFromId")
            ->with($this->identicalTo(1))
            ->willReturn(["id" => 1]);
        $handlerMock
            ->expects($this->any())
            ->method("createSale")
            ->with($reqData);

        $controller = new ProductController();
        // Execute the createSale() method
        $controller->setHandler($handlerMock);
        $controller->setReq($reqData);
        $controller->setUserHandler($userHandlerMock);
        $controller->createSale();

        // Verify the expected output (optional)
        $expectedOutput = json_encode([
            "error" => false,
            "msg" => "Sale successfully created!"
        ]);
        $this->expectOutputString($expectedOutput);
    }
}
