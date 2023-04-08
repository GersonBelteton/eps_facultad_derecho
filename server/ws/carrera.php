<?php
include('conexion.php');

$pdo = new conexion();


$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {

    header("Access-Control-Allow-Origin: http://localhost:4200");
    if (empty($_GET['id_unidad'])) {
        

        $sql = $pdo->prepare("select * from carrera");
        $sql->execute();
        $asignatura = $sql->fetchObject();
        echo json_encode($asignatura);
        exit('no hay id de carrera');

    }

    $id = $_GET['id_unidad'];
    $sql = $pdo->prepare("select * from carrera where codigo_cu = ?");
    $sql->execute([$id]);
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    $asignatura = $sql->fetchAll();
    echo json_encode($asignatura, JSON_PRETTY_PRINT);
}


?>