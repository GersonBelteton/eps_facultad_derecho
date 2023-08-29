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

    if (!empty($_GET['id_solicitud'])) {

        $id_solicitud = $_GET['id_solicitud'];
        $sql = $pdo->prepare('select detalle_previo.id as detalle_id, previo.id as previo_id, previo.descripcion from previo inner join detalle_previo on detalle_previo.id_previo = previo.id
        inner join solicitud on solicitud.id = detalle_previo.id_solicitud  where solicitud.id = ?');
        $sql->execute([$id_solicitud]);
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $res = $sql->fetchAll();
        echo json_encode($res, JSON_PRETTY_PRINT);


    } else{
        $sql = $pdo->prepare('select * from previo;');
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $res = $sql->fetchAll();
        echo json_encode($res, JSON_PRETTY_PRINT);
    }

}

if ($method == 'POST') {
   

    header("Access-Control-Allow-Origin: http://localhost:4201");
    

    $json = json_decode(file_get_contents('php://input'));
    if (!$json) {
        exit('no hay datos');
    }


    if (empty($_GET['detalle_previo'])) {
        $descripcion = $json->descripcion;

        $sql = $pdo->prepare("insert into previo (descripcion) values (?);");
        $resultado = $sql->execute([$descripcion]);
    
        echo json_encode([
            "resultado" => $resultado,
            "id" => $pdo->lastInsertId()
        ]);
    }else{
        $id_solicitud = $json->id_solicitud;
        $previos = $json->previos;
        $res = [];
        $cont = 0;
        foreach ($previos as $previo) {

            $sql = $pdo->prepare("insert into detalle_previo (id_solicitud, id_previo) values (?,?);");
            $res[$cont] = $sql->execute([$id_solicitud, $previo->id]);
            $cont++;
    
        }

        echo json_encode($res);
    }



}
if ($method == 'DELETE') {
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: http://localhost:4201");
    header("Access-Control-Allow-Headers: *");

    if (!empty($_GET['id_previo'])) {
        $id_previo = $_GET['id_previo'];

        $sql = $pdo->prepare('delete from previo where id = ?');
        $res = $sql->execute([$id_previo]);
    
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
    }else if(!empty($_GET['id_detalle_previo'])){
        $id_detalle_previo = $_GET['id_detalle_previo'];

        $sql = $pdo->prepare('delete from detalle_previo where id = ?');
        $res = $sql->execute([$id_detalle_previo]);
    
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
    }







}
?>