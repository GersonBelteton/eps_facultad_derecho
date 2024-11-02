<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Allow: *");

include 'conexion.php';

$pdo = new conexion();
if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    // $http_origin = $_SERVER['HTTP_ORIGIN'];

    // if ($http_origin == "http://localhost:4200" || $http_origin == "http://localhost:4201")
    // {  
    //     header("Access-Control-Allow-Origin: $http_origin");
    // }

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Origin: *");
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    
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
    else if (!empty($_GET['id_extension'])){
        $id = $_GET['id_extension'];

        $sql =$pdo->prepare("select * from extension_universitaria where id = ?");
        $sql->execute([$id]);

        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
    }else{

        $sql = $pdo->prepare("SELECT * FROM extension_universitaria;");
        $sql->execute();
    
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
    
    }



    
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    header("Access-Control-Allow-Origin: *");

    $json = json_decode(file_get_contents("php://input"));
    if (!$json) {
        exit("No hay datos");
    }
    $sentencia = $pdo->prepare("INSERT INTO extension_universitaria (codigo, nombre, id_ua) VALUES(?,?,?)");
    $resultado = $sentencia->execute([$json->codigo, $json->nombre, $json->id_ua]);
    echo json_encode([
        "resultado" => $resultado,
        "id" => $pdo->lastInsertId()
    ]);
}

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {

    header("Access-Control-Allow-Origin: *");

    $json = json_decode(file_get_contents("php://input"));
    if (!$json) {
        exit("No hay datos");
    }
    $sql = $pdo->prepare("UPDATE extension_universitaria SET codigo = ?, nombre = ? WHERE id = ?");
    $sql->execute([$json->codigo, $json->nombre, $json->id]);
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {



    header("Access-Control-Allow-Origin: *");

    if (!empty($_GET['id_extension'])) {
        $idExtension = $_GET['id_extension'];

        $sql = $pdo->prepare("DELETE FROM extension_universitaria WHERE id = ?;");
        $sql->execute([$idExtension]);
    
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
    

    }


}




?>