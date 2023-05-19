<?php
include 'conexion.php';

$pdo = new conexion();
if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    header("Access-Control-Allow-Origin: http://localhost:4200");

    if(!empty($_GET['extension']) && !empty($_GET['unidad_academica'])){

        $extension = $_GET['extension'];
        $unidad = $_GET['unidad_academica'];
        $sql =$pdo->prepare(
        "select extension_universitaria.id, extension_universitaria.nombre, extension_universitaria.codigo 
        from extension_universitaria
        inner join unidad_academica 
        on unidad_academica.id = extension_universitaria.id_ua 
        where extension_universitaria.codigo = ? 
        and unidad_academica.codigo = ? "
        );
        $sql->execute([$extension, $unidad]);

        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);


    }else if(!empty($_GET['unidad_academica'])){
        $unidad = $_GET['unidad_academica'];

        $sql =$pdo->prepare("select * from extension_universitaria where id_ua = ?");
        $sql->execute([$unidad]);

        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
    }
    else{

        $sql = $pdo->prepare("SELECT * FROM extension_universitaria;");
        $sql->execute();
    
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
    
    }



    
}





?>