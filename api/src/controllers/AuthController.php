<?php
namespace src\controllers;
/* 
    Esta classe contém toda a lógica que utiliza-se com os serviços de autenticação. 
    Cada método, que temalguma interação com o lado do Banco de Dados, irá chamar o objeto 
    UserHandler, que fica responsável pelas consultas ao banco e retorna os dados prontos. 
    Por fim, o controller trata esses dados e os retorna de volta em formato JSON para a 
    aplicação que consome a API. No seu construtor, o Controller recebe a requisição em formato 
    JSON, tranforma em um array PHP e armazena no atributo req.

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