<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Allow: *");


include('conexion.php');

$pdo = new conexion();


$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {

    // $http_origin = $_SERVER['HTTP_ORIGIN'];

    // if ($http_origin == "http://localhost:4200" || $http_origin == "http://localhost:4201")
    // {  
    //     header("Access-Control-Allow-Origin: $http_origin");
    // }


    header("Access-Control-Allow-Origin: *");

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



    }else if(!empty($_GET['id_carrera'])){
        $id = $_GET['id_carrera'];
        $sql = $pdo->prepare("select * from carrera where id = ?");
        $sql->execute([$id]);
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $carrera = $sql->fetchAll();
        echo json_encode($carrera, JSON_PRETTY_PRINT);
    }else{
        $sql = $pdo->prepare("select * from carrera");
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $carrera = $sql->fetchAll();
        echo json_encode($carrera, JSON_PRETTY_PRINT);
    }


}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    header("Access-Control-Allow-Origin: *");

    $json = json_decode(file_get_contents("php://input"));
    if (!$json) {
        exit("No hay datos");
    }
    $sentencia = $pdo->prepare("INSERT INTO carrera (codigo, nombre, id_eu) VALUES(?,?,?)");
    $resultado = $sentencia->execute([$json->codigo, $json->nombre, $json->id_eu]);
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
    $sql = $pdo->prepare("UPDATE carrera SET codigo = ?, nombre = ? WHERE id = ?");
    $sql->execute([$json->codigo, $json->nombre, $json->id]);
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {



    header("Access-Control-Allow-Origin: *");

    if (!empty($_GET['id_carrera'])) {
        $idCarrera = $_GET['id_carrera'];

        $sql = $pdo->prepare("DELETE FROM carrera WHERE id = ?;");
        $sql->execute([$idCarrera]);
    
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
    

    }


}


?>