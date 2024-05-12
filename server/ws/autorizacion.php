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

    if(!empty($_GET['unidad_academica'])){



    }
    else if(!empty($_GET['id'])){




    }else if(!empty($_GET['cohorte'])&&!empty($_GET['id_unidad'])){

        $id_unidad = $_GET['id_unidad'];
        $cohorte = $_GET['cohorte'];


        $sql =$pdo->prepare("select * from autorizacion inner join unidad_academica on autorizacion.id_unidad = unidad_academica.id where unidad_academica.id = ?;");
        $sql->execute([$id_unidad]);

        $sql->setFetchMode(PDO::FETCH_ASSOC);

        //header("HTTP/1.1 200 OK");


        $arreglo = $sql->fetchAll();
        //print_r("hola");
     //  print_r($arreglo);
       // print_r($arreglo[0]);
       //print_r($sql->fetchAll());
       // print_r($sql->fetchAll()[0]);

       // print_r($sql->fetchAll()[0]['fecha_a']);


        
        $fecha_ia = $arreglo[0]['fecha_ia'];
        $fecha_a = $arreglo[0]['fecha_a'];
        $codigo = $arreglo[0]['codigo'];

       // print($fecha_a);


        $fechaArr = explode(" ", $fecha_a);

        $mes = $fechaArr[1];
        $año = $fechaArr[2];

        //print_r($fechaArr);


        $punto_a = $arreglo[0]['punto_a'];
        $acta_a = $arreglo[0]['acta_a'];
        $inciso_a = $arreglo[0]['inciso_a'];
        $punto_ia = $arreglo[0]['punto_ia'];
        $acta_ia = $arreglo[0]['acta_ia'];
        $inciso_ia = $arreglo[0]['inciso_ia'];


        if($codigo == '12'){
            Autorizacion('REGLAMENTACION',$punto_a, $acta_a, $inciso_a, $fecha_a);
        }else{
            if($cohorte > $año){
                // print('autorizado');
                 Autorizacion('AUTORIZACION',$punto_a, $acta_a, $inciso_a, $fecha_a);
     
             }else if($cohorte < $año){
                // print('se busca regularización');
                 BuscarRegularizacion($punto_ia, $acta_ia, $inciso_ia, $fecha_ia);
             }else{
                 //print('se comparan meses');
                 if($mes == 'julio' || $mes == 'agosto' ||$mes == 'septiembre' ||$mes == 'octubre' ||$mes == 'noviembre' ||$mes == 'diciembre'){
                     //print('Se busca regularización');
                     BuscarRegularizacion($punto_ia, $acta_ia, $inciso_ia, $fecha_ia);
                 }else{
                     //print('autorizado');
                     Autorizacion('AUTORIZACION',$punto_a, $acta_a, $inciso_a, $fecha_a);
     
                 }
             }
        }



       // print_r( $mes);
       //$result = json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
       //echo $result[0]->id;

    
    }else{
       


        $sql =$pdo->prepare("select autorizacion.id, tipo, descripcion, punto_a, acta_a, inciso_a, punto_ia, acta_ia, inciso_ia, fecha_ia, fecha_a, nombre, codigo from autorizacion inner join unidad_academica on autorizacion.id_unidad = unidad_academica.id;");
        $sql->execute();

        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
    }



    
}

function BuscarRegularizacion($punto, $acta, $inciso, $fecha){
   // print("fecha".$fecha."fecha");
    if($fecha != "  "){
        //print('regularizado');

        Autorizacion('REGULARIZACION',$punto, $acta, $inciso, $fecha);

    }else{
        //print('rechazado');
        header("HTTP/1.1 200 OK");
        echo json_encode([
            "msg" => 'RECHAZADO',
        ],JSON_PRETTY_PRINT);
    }
}

function Autorizacion($tipo, $punto, $acta, $inciso, $fecha){
   // print('autorizado');

    header("HTTP/1.1 200 OK");
    echo json_encode([

        "msg" => $tipo,
        "datos"=>[
            "punto"=>$punto,
            "acta"=>$acta,
            "inciso" =>$inciso,
            "fecha" =>$fecha
        ]
    ],JSON_PRETTY_PRINT);
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
        $sentencia = $pdo->prepare("insert into autorizacion (tipo, descripcion, punto_a, acta_a, inciso_a, punto_ia, acta_ia, inciso_ia, fecha_a, fecha_ia, id_unidad ) values (\"Reglamentación\", \"descripcion\", ?, ?, ?, ?, ?, ?, ?, ?, ?);");
    $resultado = $sentencia->execute([$json->punto_a, $json->acta_a, $json->inciso_a, $json->punto_ia, $json->acta_ia, $json->inciso_ia, $json->fecha_a, $json->fecha_ia, $json->id_unidad]);
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

    if (!empty($_GET['id_autorizacion'])) {
        $idAutorizacion = $_GET['id_autorizacion'];

        $sql = $pdo->prepare("DELETE FROM autorizacion WHERE id = ?;");
        $sql->execute([$idAutorizacion]);
    
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
    

    }


}


?>