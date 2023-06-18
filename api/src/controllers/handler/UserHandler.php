<?php

namespace src\controllers\handler;

use src\connection\Connection;
/*

This class aims to handle all the database interactions, including querying, 
CRUD operations, and returning data for use in controllers. Each method utilizes 
the private attribute sql, which is obtained from the database connection object. 
This object returns the PHP PDO object, which is used to perform database manipulations.

*/


class UserHandler {

    private $instance;

    public function __construct(){
        $connection = new Connection();
        $this->instance = $connection->getSql();
        
    }

    public function signin($email, $password){
        $query = "SELECT id, email, name, password FROM users WHERE email = :email LIMIT 1";
        $sql = $this->instance->prepare($query);
        $sql->bindValue(':email', $email);
        $sql->execute();

        $user = $sql->fetch(\PDO::FETCH_ASSOC);

        if(!empty($user)){
            if(password_verify($password, $user['password'])){
                $query = "UPDATE users SET token = :token WHERE id = :id";
                $token = $this->tokenGenerator();

                $sql = $this->instance->prepare($query);
                $sql->bindValue(':token', $token);
                $sql->bindValue(':id', $user['id']);
                $sql->execute();

                $user['token'] = $token;
                unset($user['password']);

                return $user;
            }
        }

        return false;

    }

    public function signup($data){
        $query = "SELECT email FROM users WHERE email = :email LIMIT 1";

        $sql = $this->instance->prepare($query);
        $sql->bindValue(':email', $data['email']);
        $sql->execute();

        $result = $sql->fetch(\PDO::FETCH_ASSOC);

        if(empty($result)){
            $query = "INSERT INTO users (name, email, password, token, created_at, updated_at) VALUES (:name, :email, :password, :token, :created_at, :updated_at)";
            $timestamp = new Datetime();
            $token = $this->tokenGenerator();
            $datetime = $timestamp->format('Y-m-d H:i:s');

            $sql = $this->instance->prepare($query);
            $sql->bindValue(':name', $data['name']);
            $sql->bindValue(':email', $data['email']);
            $sql->bindValue(':password', password_hash($data['password'], PASSWORD_DEFAULT));
            $sql->bindValue(':token', $token);
            $sql->bindValue(':created_at', $datetime);
            $sql->bindValue(':updated_at', $datetime);
            $sql->execute();

            $query = "SELECT name, email, token FROM users WHERE email = :email LIMIT 1";

            $sql = $this->instance->prepare($query);
            $sql->bindValue(':email', $data['email']);
            $sql->execute();

            $user = $sql->fetch(\PDO::FETCH_ASSOC);
    
            return $user;
        }
        return false;

    }

    public function getUserFromId($id) {
        $query = "SELECT id FROM users WHERE id = :id LIMIT 1";

        $sql = $this->instance->prepare($query);
        $sql->bindValue('id', $id);
        $sql->execute();

        $result = $sql->fetch(\PDO::FETCH_ASSOC);
        return $result;
    }

    private function tokenGenerator(){
        $timestamp = time();
        $tokenString = $timestamp."d41d8cd";
        $token = md5($tokenString);

        return $token;
    }

}
