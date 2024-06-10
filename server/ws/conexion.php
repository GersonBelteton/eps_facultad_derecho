<?php 


class conexion extends PDO {


     private $host = 'localhost';
     private $name = 'departamentales';
     private $user = 'user_sitio';
     private $password = 'xtech120904';

   // private $host = 'localhost';
   // private $name = 'epsProyect';
   // private $user = 'root';
   // private $password = '1234';
    
    public function __construct(){

        try{
            parent::__construct('mysql:host=' . $this->host . ';dbname=' . $this->name . ';charset=utf8', $this->user, $this->password, array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION));
        }catch(PDOException $e){
            echo 'Error: ' . $e->getMessage();
            exit;
        }
    }
}
?>