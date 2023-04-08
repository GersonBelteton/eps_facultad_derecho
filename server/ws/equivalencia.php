<?php
include('conexion.php');

$pdo = new conexion();


$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {

    header("Access-Control-Allow-Origin: http://localhost:4200");
    if (empty($_GET['id_carrera']) || empty($_GET['id_asignatura'])) {
        
        exit('no hay datos de suficientes');

    }

    $id_carrera = $_GET['id_carrera'];
    $id_asignatura = $_GET['id_asignatura'];
    $sql = $pdo->prepare("(select * from equivalencia inner join asignatura on codigo_asignatura2 = asignatura.codigo where codigo_asignatura1 = ? and codigo_carrera = ?)
    union
    (select * from equivalencia inner join asignatura on codigo_asignatura1 = asignatura.codigo where codigo_asignatura2 = ? and codigo_carrera = ?)");
    $sql->execute([$id_asignatura, $id_carrera, $id_asignatura, $id_carrera ]);
    $resultado = $sql->fetchObject();
    echo json_encode($resultado);


}


?>