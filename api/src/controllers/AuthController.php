<?php
namespace src\controllers;
/* 
  This class contains all the logic used with authentication services.
    Each method, which has some interaction with the Database side, will call the object
    UserHandler, which is responsible for queries to the database and returns the data ready.
    Finally, the controller handles this data and returns it back in JSON format to the
    application that consumes the API.

*/
use src\controllers\handler\UserHandler;
use src\controllers\ControllerConfig;

class AuthController extends ControllerConfig {

    private $handler;

    public function __construct(){
        $hand = new UserHandler();
        $this->getRequisition();
        $this->setHandler($hand);
    }

    public function setHandler($handler){
        $this->handler = $handler;
    }

    public function signin (){
        $data = $this->req;
        $callback = [];

        $email = $this->verifyFields('email', $data, FILTER_VALIDATE_EMAIL);
        $password = $this->verifyFields('password', $data, FILTER_SANITIZE_SPECIAL_CHARS);

        if ($email && $password){
            $user = $this->handler->signin($email, $password);

            if($user !== false){
                $callback = ['error' => false, 'user' => $user];

            }else{
                $callback = ['error' => 'Invalid email or password.'];
            }
        }else{
            $callback = ['error' => 'Invalid email or password.'];
        }

        echo json_encode($callback);
    }

    public function signup() {
        $callback = [];
        $data = $this->req;

        $name = $this->verifyFields('name', $data, FILTER_SANITIZE_SPECIAL_CHARS);
        $email = $this->verifyFields('email', $data, FILTER_VALIDATE_EMAIL);
        $password = $this->verifyFields('password', $data, FILTER_SANITIZE_SPECIAL_CHARS);

        if($name && $email && $password){
            $data = [
                'name' => $name,
                'email' => $email,
                'password' => $password
            ];

            $user = $this->handler->signup($data);

            if($user !== false){
                $callback = ['error' => false, 'user' => $user];
            }else{
                $callback = ['error' => 'The email already exists, try again with another email.'];
            }

        }else{
            $callback = ['error' => 'The fields are incorrect.'];
        }

        echo json_encode($callback);

    }
}
?>
