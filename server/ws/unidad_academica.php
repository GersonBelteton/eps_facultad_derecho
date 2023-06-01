<?php
include 'conexion.php';

$pdo = new conexion();
if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    header("Access-Control-Allow-Origin: http://localhost:4200");

    if(!empty($_GET['unidad_academica'])){

        $unidad = $_GET['unidad_academica'];


        $sql =$pdo->prepare("select * from unidad_academica where codigo = ?");
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
        "id" => $pdo->lastInsertId()
    ]);
}


?>