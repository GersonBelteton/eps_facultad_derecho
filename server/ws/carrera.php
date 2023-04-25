<?php
include('conexion.php');

$pdo = new conexion();


$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {

    header("Access-Control-Allow-Origin: http://localhost:4200");
    if(!empty($_GET['codigo_carrera'])){


        $id = $_GET['codigo_carrera'];
        $unidad_academica = $_GET['unidad_academica'];
        $extension = $_GET['extension'];

        $sql = $pdo->prepare("select carrera.id, carrera.nombre, carrera.codigo_carrera from carrera inner join centro_universitario 
        on centro_universitario.id = carrera.codigo_cu where codigo_carrera = ? 
        and unidad_academica = ? and extension_universitaria = ?");
        $sql->execute([$id, $unidad_academica, $extension]);
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $carrera = $sql->fetchAll();
        echo json_encode($carrera, JSON_PRETTY_PRINT);

    } else if (!empty($_GET['id_unidad'])) {
        

        $id = $_GET['id_unidad'];
        $sql = $pdo->prepare("select * from carrera where codigo_cu = ?");
        $sql->execute([$id]);
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $carrera = $sql->fetchAll();
        echo json_encode($carrera, JSON_PRETTY_PRINT);



    }else{
        $sql = $pdo->prepare("select * from carrera");
        $sql->execute();
        $carrera = $sql->fetchObject();
        echo json_encode($carrera);
       
    }


}


?>