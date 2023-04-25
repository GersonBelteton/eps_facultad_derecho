<?php
include('conexion.php');

$pdo = new conexion();


$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {

    header("Access-Control-Allow-Origin: http://localhost:4200");
    if (empty($_GET['id_carrera'])) {
        

        $sql = $pdo->prepare("select * from asignatura");
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $asignatura = $sql->fetchAll();
        echo json_encode($asignatura,JSON_PRETTY_PRINT);
        exit('no hay id de carrera');

    }

    $id = $_GET['id_carrera'];
    $sql = $pdo->prepare("select * from asignatura where codigo_carrera = ?");
    $sql->execute([$id]);
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    $asignatura = $sql->fetchAll();
    echo json_encode($asignatura, JSON_PRETTY_PRINT);
}


?>