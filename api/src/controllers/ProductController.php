<?php
namespace src\controllers;

use src\controllers\handler\ProductHandler;
use src\controllers\handler\UserHandler;
use src\controllers\ControllerConfig;


class ProductController extends ControllerConfig{
    private $handler;
    private $userHandler;

    public function __construct(){
        $hand = new ProductHandler();
        $userHand = new UserHandler();
        $this->getRequisition();
        $this->setHandler($hand);
        $this->setUserHandler($userHand);
    }

    public function setHandler($handler){
        $this->handler = $handler;
    }

    public function setUserHandler($userHandler){
        $this->userHandler = $userHandler;
    }

    public function createProduct() {
        $reqData = $this->req;
        $hasError = false;
        $callback = [];

        $data = [
            'name' => $this->verifyFields('name', $reqData, FILTER_SANITIZE_SPECIAL_CHARS),
            'supplier' => $this->verifyFields('supplier', $reqData, FILTER_SANITIZE_SPECIAL_CHARS),
            'batch' => $this->verifyFields('batch', $reqData, FILTER_SANITIZE_SPECIAL_CHARS),
            'product_type_id' => $this->verifyFields('product_type_id', $reqData, FILTER_SANITIZE_SPECIAL_CHARS),
            'unit_price' => $this->verifyFields('unit_price', $reqData, FILTER_SANITIZE_SPECIAL_CHARS),
            'quantity' => $this->verifyFields('quantity', $reqData, FILTER_SANITIZE_SPECIAL_CHARS),
        ];

        foreach($data as $key => $item){
            if(!$item && $key !== "batch"){
                $callback = ['error' => "The fields were submitted incorrectly."];

                echo json_encode($callback);
                exit;
            }
        }

        // $handler = new ProductHandler();

        $productTypeExists = $this->handler->getProductTypeFromId(intval($data['product_type_id']));

        if(!empty($productTypeExists)){
            $productExists = $this->handler->getProductFromName($data['name']);

            if(empty($productExists)){
                $this->handler->createProduct($data);

                $callback = ["error" => false, "msg" => "Product created successfully!"];
            }else{
                $callback = ["error" => "A product with the same name already exists"];
            }
        }else{
            $callback = ["error" => "The product type does not exist."];
        }

        echo json_encode($callback);
        
    }

    public function createProductType (){
        $reqData = $this->req;
        $callback = [];
        $name = $this->verifyFields('name', $reqData, FILTER_SANITIZE_SPECIAL_CHARS);
        $tax = $this->verifyFields('tax', $reqData, FILTER_SANITIZE_SPECIAL_CHARS);

        if($name){

            $hasProductTypeName = $this->handler->getProductTypeFromName($name);

            if(empty($hasProductTypeName)){
                $data = ['name' => $name, 'tax' => $tax];
                $this->handler->createProductType($data);

                $callback = ['error' => false, 'msg' => 'Product type successfully created!'];
            }else{
                $callback = ['error' => 'A product type with the same name already exists'];
            }
        }else{
            $callback = ['error' => 'The fields were submitted incorrectly.'];
        }

        echo json_encode($callback);
    }

    public function getProductsType (){

        $productsType = $this->handler->getProductsType();

        $callback = ['error' => false, 'productsType' => $productsType];

        echo json_encode($callback);
    }

    public function getProducts() {
        $callback = [];
        $products = $this->handler->getProducts();

        $callback = ['error' => false, 'products' => $products];

        echo json_encode($callback);
    }

    public function createSale() {
        $data = $this->req;
        $callback = [];
        $data = [
            'product_id' =>$this->verifyFields('product_id', $data, FILTER_SANITIZE_SPECIAL_CHARS),
            'user_id' => $this->verifyFields('user_id', $data, FILTER_SANITIZE_SPECIAL_CHARS),
            'price' => $this->verifyFields('price', $data, FILTER_SANITIZE_SPECIAL_CHARS),
            'datetime' => $this->verifyFields('datetime', $data, FILTER_SANITIZE_SPECIAL_CHARS),
            'quantity'=> $this->verifyFields('quantity', $data, FILTER_SANITIZE_SPECIAL_CHARS),
        ];

        foreach($data as $item) {
            if(empty($item)){
                $callback = ['error' => 'The fields were submitted incorrectly.'];

                echo json_encode($callback);
                exit;
            }
        }

        $isProduct = $this->handler->getProductFromId(intval($data['product_id']));

        if(!empty($isProduct)){
            $isUser = $this->userHandler->getUserFromId(intval($data['user_id']));

            if(!empty($isUser)){
                for ($i = 0; $i < $data['quantity']; $i++){
                    $this->handler->createSale($data);
                }
                $callback = ['error' => false, 'msg' => 'Sale successfully created!'];
            }else{
                $callback = ['error' => 'An error occurred or the user does not exist.'];
            }
        }else{
            $callback = ['error' => 'The product does not exist.'];
        }

        echo json_encode($callback);
        
    }
}
?>