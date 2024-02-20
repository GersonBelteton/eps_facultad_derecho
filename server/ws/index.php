<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Allow: *");

include 'conexion.php';
header("Access-Control-Allow-Origin: *");

$pdo = new conexion();
if ($_SERVER['REQUEST_METHOD'] == 'GET') {


    $http_origin = $_SERVER['HTTP_ORIGIN'];

    if ($http_origin == "http://localhost:4200" || $http_origin == "http://localhost:4201")
    {  
        header("Access-Control-Allow-Origin: $http_origin");
    }

    if(!empty($_GET['id_carrera'])){


        $id = $_GET['id_carrera'];

        $sql = $pdo->prepare(

            "select carrera.codigo as carrera_codigo, carrera.nombre as carrera_nombre, 
            extension_universitaria.codigo as extension_codigo, extension_universitaria.nombre as extension_nombre, 
            unidad_academica.codigo as unidad_codigo, unidad_academica.nombre as unidad_nombre, unidad_academica.id as unidad_id
            from carrera inner join extension_universitaria on carrera.id_eu = extension_universitaria.id
            inner join unidad_academica on unidad_academica.id = extension_universitaria.id_ua
            where carrera.id = ?;"
        );
        $sql->execute([$id]);
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $carrera = $sql->fetchAll();
        echo json_encode($carrera, JSON_PRETTY_PRINT);
    }else{
        echo "EQUIVALENCIAS DERECHO USAC";
    }
}
//Insertar registro
// if ($_SERVER['REQUEST_METHOD'] == 'POST') {
//     $sql = "INSERT INTO centro_universitario (nombre, unidad_academica, extension_universitaria, abreviatura) VALUES(:nombre, :unidad_academica, :extension, :abreviatura)";
//     $stmt = $pdo->prepare($sql);
//     $stmt->bindValue(':nombre', $_POST['nombre']);
//     $stmt->bindValue(':unidad_academica', $_POST['unidad_academica']);
//     $stmt->bindValue(':extension', $_POST['extension']);
//     $stmt->bindValue(':abreviatura', $_POST['abreviatura']);
//     $stmt->execute();
//     $idPost = $pdo->lastInsertId();
//     if ($idPost) {
//         header("HTTP/1.1 200 Ok");
//         echo json_encode($idPost);
//         exit;
//     }
// }

if($_SERVER['REQUEST_METHOD']=='POST'){
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Headers: *");
    $json = json_decode(file_get_contents("php://input"));
    if (!$json) {
        exit("No hay datos");
    }
    $sentencia = $pdo->prepare("INSERT INTO centro_universitario (nombre, unidad_academica, extension_universitaria, abreviatura) VALUES(?,?,?,?)");
    $resultado = $sentencia->execute([$json->nombre, $json->unidad_academica, $json->extension, $json->abreviatura]);
    echo json_encode([
        "resultado" => $resultado,
    ]);
}







?>