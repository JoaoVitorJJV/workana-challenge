<?php
namespace src\controllers;

class ControllerConfig {
    protected $req = [];
    // Validação
    public function getRequisition(){
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        $this->req = $data;

    }

    protected function verifyFields($name, $data, $validator){
        return isset($data[$name]) ? filter_var($data[$name], $validator) : false;
    }

    public function getReq() {
        return $this->req;
    }

    public function setReq($req) {
        $this->req = $req;
    }


}