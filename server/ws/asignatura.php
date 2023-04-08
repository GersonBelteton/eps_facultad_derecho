<?php
include('conexion.php');

$pdo = new conexion();


$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {

    header("Access-Control-Allow-Origin: http://localhost:4200");
    if (empty($_GET['id_carrera'])) {
        

        $sql = $pdo->prepare("select * from asignatura");
        $sql->execute();
        $asignatura = $sql->fetchObject();
        echo json_encode($asignatura);
        exit('no hay id de carrera');

    }

    $id = $_GET['id_carrera'];
    $sql = $pdo->prepare("select * from asignatura where codigo_carrera = ?");
    $sql->execute([$id]);
    $asignatura = $sql->fetchObject();
    echo json_encode($asignatura);
}


?>