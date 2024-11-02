<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Allow: *");

include 'conexion.php';

$pdo = new conexion();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {


    header("Access-Control-Allow-Origin: *");

    $json = json_decode(file_get_contents('php://input'));
    if (!$json) {
        exit('no hay datos');
    }


    $api = $json->api;

    if($api == "login"){
        $user = $json->user;
        $password = $json->password;
    
        $sql = $pdo->prepare("SELECT * FROM administrador where usuario = ? and contrasena = ?;");
        $sql->execute([$user,$password]);
    
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
    }else if($api == "create"){

        $user = $json->user;
        $password = $json->password;
        $nombre_completo = $json->nombre_completo;
        $permiso_usuarios = $json->permiso_usuarios;
        $permiso_expedientes = $json->permiso_expedientes;
        $permiso_equivalencias = $json->permiso_equivalencias;

        $sql = $pdo->prepare("insert into administrador(nombre_completo, usuario, contrasena, permiso_usuarios, permiso_equivalencias, permiso_expedientes) 
        values (?, ?, ?, ?, ?, ? );");
       $resultado = $sql->execute([$nombre_completo,$user,$password,$permiso_usuarios,$permiso_equivalencias,$permiso_expedientes]);

        echo json_encode([
            "resultado" => $resultado,
            "id" => $pdo->lastInsertId()
        ]);
    }



}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {



    header("Access-Control-Allow-Origin: *");
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Pragma: no-cache");
    
    if (!empty($_GET['id_admin'])) {
        $idAdmin = $_GET['id_admin'];

        $sql = $pdo->prepare("SELECT * FROM administrador where id = ?;");
        $sql->execute([$idAdmin]);
    
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
    

    }else{
        $sql = $pdo->prepare("SELECT id, nombre_completo, usuario FROM administrador;");
        $sql->execute();
    
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
    }


}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {



    header("Access-Control-Allow-Origin: *");

    if (!empty($_GET['id_admin'])) {
        $idAdmin = $_GET['id_admin'];

        $sql = $pdo->prepare("DELETE FROM administrador WHERE id = ?;");
        $sql->execute([$idAdmin]);
    
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
    

    }


}


if ($_SERVER['REQUEST_METHOD'] == 'PUT') {



    header("Access-Control-Allow-Origin: *");

    $json = json_decode(file_get_contents('php://input'));
    if (!$json) {
        exit('no hay datos');
    }



        $idAdmin = $json->idAdmin;
        $user = $json->user;
        $password = $json->password;
        $nombre_completo = $json->nombre_completo;
        $permiso_usuarios = $json->permiso_usuarios;
        $permiso_expedientes = $json->permiso_expedientes;
        $permiso_equivalencias = $json->permiso_equivalencias;

        $sql = $pdo->prepare("UPDATE administrador SET 
            nombre_completo = ?,
            usuario = ?,
            contrasena = ?,
            permiso_usuarios = ?,
            permiso_equivalencias = ?,
            permiso_expedientes = ?
            WHERE id = ?; ");

        $sql->execute([$nombre_completo,$user,$password,$permiso_usuarios,$permiso_equivalencias,$permiso_expedientes,$idAdmin]);
    
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
    

    


}









?>