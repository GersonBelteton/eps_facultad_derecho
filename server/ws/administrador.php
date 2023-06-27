<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Allow: *");

include 'conexion.php';

$pdo = new conexion();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {


    header("Access-Control-Allow-Origin: http://localhost:4201");

    $json = json_decode(file_get_contents('php://input'));
    if (!$json) {
        exit('no hay datos');
    }


    $user = $json->user;
    $password = $json->password;

    $sql = $pdo->prepare("SELECT * FROM administrador where usuario = ? and contrasena = ?;");
    $sql->execute([$user,$password]);

    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);


}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {



    header("Access-Control-Allow-Origin: http://localhost:4201");
    $idAdmin = $_GET['id_admin'];

    $sql = $pdo->prepare("SELECT id, nombre_completo, usuario FROM administrador where id = ?;");
    $sql->execute([$idAdmin]);

    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);


}










?>