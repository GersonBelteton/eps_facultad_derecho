<?php

include 'conexion.php';

$pdo = new conexion();
if ($_SERVER['REQUEST_METHOD'] == 'GET') {


    header("Access-Control-Allow-Origin: http://localhost:4200");
    $registro_academico = $_GET['registro_academico'];
    $pin = $_GET['pin'];

    $sql = $pdo->prepare("SELECT * FROM estudiante where registro_academico = ? and pin = ?;");
    $sql->execute([$registro_academico,$pin]);

    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);


}










?>