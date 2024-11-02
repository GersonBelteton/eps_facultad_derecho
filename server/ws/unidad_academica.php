<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Allow: *");


include 'conexion.php';
include 'env.php';

$pdo = new conexion();
$env = new env();
$host = $env->getHost();
if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    // header("Access-Control-Allow-Origin: http://localhost:4200");
    // $http_origin = $_SERVER['HTTP_ORIGIN'];

    // if ($http_origin == $host.":4200" || $http_origin == $host.":4200" )
    // {  
    //     header("Access-Control-Allow-Origin: $http_origin");
    // }

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Origin: *");
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");

    if(!empty($_GET['unidad_academica'])){

        $unidad = $_GET['unidad_academica'];


        $sql =$pdo->prepare("select * from unidad_academica where codigo = ?");
        $sql->execute([$unidad]);

        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);


    }
    else if(!empty($_GET['id'])){

        $unidad = $_GET['id'];


        $sql =$pdo->prepare("select * from unidad_academica where id = ?");
        $sql->execute([$unidad]);

        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);


    }else if(!empty($_GET['origen'])){

        $unidades = $_GET['origen'];
        if($unidades == 'centro_regional'){

            $sql = $pdo->prepare("select * from unidad_academica where codigo = '04';");
 
        }else if($unidades == 'campus_central'){
            $sql = $pdo->prepare("select * from unidad_academica where codigo != '04';");
        
        }

        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
    
    }else{
       


        $sql =$pdo->prepare("select * from unidad_academica");
        $sql->execute();

        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
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

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    header("Access-Control-Allow-Origin: *");

    $json = json_decode(file_get_contents("php://input"));
    if (!$json) {
        exit("No hay datos");
    }
    $sentencia = $pdo->prepare("INSERT INTO unidad_academica (codigo, nombre) VALUES(?,?)");
    $resultado = $sentencia->execute([$json->codigo, $json->nombre]);
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
    $sql = $pdo->prepare("UPDATE unidad_academica SET codigo = ?, nombre = ? WHERE id = ?");
    $sql->execute([$json->codigo, $json->nombre, $json->id]);
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {



    header("Access-Control-Allow-Origin: *");

    if (!empty($_GET['id_unidad'])) {
        $idUnidad = $_GET['id_unidad'];

        $sql = $pdo->prepare("DELETE FROM unidad_academica WHERE id = ?;");
        $sql->execute([$idUnidad]);
    
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
    

    }


}


?>