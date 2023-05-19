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

        $sql = $pdo->prepare(

            "select carrera.id, carrera.nombre, carrera.codigo 
            from carrera inner join extension_universitaria 
            on extension_universitaria.id = carrera.id_eu
            inner join unidad_academica 
            on unidad_academica.id = extension_universitaria.id_ua 
            where extension_universitaria.codigo = ? 
            and unidad_academica.codigo = ? 
            and carrera.codigo = ?"
        );
        $sql->execute([$extension, $unidad_academica,$id]);
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $carrera = $sql->fetchAll();
        echo json_encode($carrera, JSON_PRETTY_PRINT);

    } else if (!empty($_GET['id_extension'])) {
        

        $id = $_GET['id_extension'];
        $sql = $pdo->prepare("select * from carrera where id_eu = ?");
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