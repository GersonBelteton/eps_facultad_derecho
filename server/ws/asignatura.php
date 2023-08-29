<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Allow: *");

include('conexion.php');

$pdo = new conexion();


$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {


    $http_origin = $_SERVER['HTTP_ORIGIN'];

    if ($http_origin == "http://localhost:4200" || $http_origin == "http://localhost:4201")
    {  
        header("Access-Control-Allow-Origin: $http_origin");
    }

    if (!empty($_GET['id_carrera'])) {
        
        $id = $_GET['id_carrera'];
        $sql = $pdo->prepare("select * from asignatura where codigo_carrera = ?");
        $sql->execute([$id]);
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $asignatura = $sql->fetchAll();
        echo json_encode($asignatura, JSON_PRETTY_PRINT);

    }else if(!empty($_GET['id_asignatura'])) {
        
        $id = $_GET['id_asignatura'];
        $sql = $pdo->prepare("select * from asignatura where id = ?");
        $sql->execute([$id]);
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $asignatura = $sql->fetchAll();
        echo json_encode($asignatura, JSON_PRETTY_PRINT);

    }else{
        $sql = $pdo->prepare("select * from asignatura");
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $asignatura = $sql->fetchAll();
        echo json_encode($asignatura,JSON_PRETTY_PRINT);
        exit('no hay id de carrera');
    }




}
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    header("Access-Control-Allow-Origin: http://localhost:4201");

    $json = json_decode(file_get_contents("php://input"));
    if (!$json) {
        exit("No hay datos");
    }
    $sentencia = $pdo->prepare("INSERT INTO asignatura (codigo_asignatura, nombre, codigo_carrera) VALUES(?,?,?)");
    $resultado = $sentencia->execute([$json->codigo, $json->nombre, $json->id_ca]);
    echo json_encode([
        "resultado" => $resultado,
        "id" => $pdo->lastInsertId()
    ]);
}

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {

    header("Access-Control-Allow-Origin: http://localhost:4201");

    $json = json_decode(file_get_contents("php://input"));
    if (!$json) {
        exit("No hay datos");
    }
    $sql = $pdo->prepare("UPDATE asignatura SET codigo_asignatura = ?, nombre = ? WHERE id = ?");
    $sql->execute([$json->codigo, $json->nombre, $json->id]);
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {



    header("Access-Control-Allow-Origin: http://localhost:4201");

    if (!empty($_GET['id_asignatura'])) {
        $idAsignatura = $_GET['id_asignatura'];

        $sql = $pdo->prepare("DELETE FROM asignatura WHERE id = ?;");
        $sql->execute([$idAsignatura]);
    
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
    

    }


}


?>