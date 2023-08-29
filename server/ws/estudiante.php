<?php


header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Allow: *");

include 'conexion.php';

$pdo = new conexion();
if ($_SERVER['REQUEST_METHOD'] == 'GET') {


    header("Access-Control-Allow-Origin: http://localhost:4200");
    // $registro_academico = $_GET['registro_academico'];
    // $pin = $_GET['pin'];

    // $sql = $pdo->prepare("SELECT * FROM estudiante where registro_academico = ? and pin = ?;");
    // $sql->execute([$registro_academico,$pin]);

    // $sql->setFetchMode(PDO::FETCH_ASSOC);
    // header("HTTP/1.1 200 OK");
    // echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);

    $registro_academico = $_GET['registro_academico'];

    $sql = $pdo->prepare("SELECT estudiante, registro_academico, cui_pasaporte FROM solicitud where registro_academico = ?;");
    $sql->execute([$registro_academico]);

    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);


}










?>