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
    //header("Access-Control-Allow-Origin:[http://localhost:4200, http://localhost:4201]");
    //header("Access-Control-Allow-Origin: http://localhost:4201");
    if (!empty($_GET['registro_academico'])) {

        $registro = $_GET['registro_academico'];
        $sql = $pdo->prepare('select * from solicitud where registro_academico = ?');
        $sql->execute([$registro]);
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $res = $sql->fetchAll();
        echo json_encode($res, JSON_PRETTY_PRINT);
        //exit('no hay registro academico');

    } else if (!empty($_GET['id_solicitud'])) {
        $id_solicitud = $_GET['id_solicitud'];
        $sql = $pdo->prepare('select * from solicitud where id = ?');
        $sql->execute([$id_solicitud]);
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $res = $sql->fetchAll();

        $sql = $pdo->prepare('select asignatura.id, asignatura.nombre,asignatura.codigo_carrera,asignatura.codigo_asignatura
         from asignatura inner join detalle_solicitud on
        detalle_solicitud.codigo_asignatura = asignatura.id where id_solicitud = ?');
        $asignaturas = $sql->execute([$id_solicitud]);
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $asignaturas = $sql->fetchAll();
        echo json_encode([
            "solicitud" => $res,
            "asignaturas" => $asignaturas
        ], JSON_PRETTY_PRINT);
    }else{
        $sql = $pdo->prepare('select * from solicitud;');
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $res = $sql->fetchAll();
        echo json_encode($res, JSON_PRETTY_PRINT);
    }

    //exit('no hay id solicitud ni registro academico');
}

if ($method == 'POST') {
    /*header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: X-Requested-With');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Content-Type: application/json');
*/

    

    $json = json_decode(file_get_contents('php://input'));
    if (!$json) {
        exit('no hay datos');
    }


    $estudiante = $json->estudiante;
    $registro = $json->registro_academico;
    $tipo = $json->tipo;
    $carrera = $json->codigo_carrera;
    $asignaturas = $json->asignaturas;
    $nombre_archivo = $json->archivo->fileName;
    $archivo = $json->archivo->base64textString;
    $archivo = base64_decode($archivo);
    $path = "/WS/documentos/certificados_cursos/".$registro."_".$nombre_archivo;
    $filePath = $_SERVER['DOCUMENT_ROOT'].$path;


    $i=1;
    while(file_exists($filePath)){
     $nombre_archivo="($i)".$nombre_archivo;
     $i++;
     $filePath = $_SERVER['DOCUMENT_ROOT']."/WS/documentos/certificados_cursos/".$registro."_".$nombre_archivo;
    }


    file_put_contents($filePath, $archivo);





    $sql = $pdo->prepare("insert into solicitud (estudiante, registro_academico, tipo, estado, ruta_certificado_cursos, fecha_inicio, codigo_carrera)
    values (?,?,?,'PI',?,now(), ?)");
    $sql->execute([$estudiante, $registro, $tipo, "http://localhost".$path, $carrera]);/// colocar url del servidor backend en la parte de gethostbyname//gethostbyname( gethostname())
    $id_solicitud = $pdo->lastInsertId();
    $res = [];
    $cont = 0;
    foreach ($asignaturas as $asignatura) {

        $sql = $pdo->prepare("insert into detalle_solicitud (id_solicitud, codigo_asignatura)
        values (?,?)");
        $res[$cont] = $sql->execute([$id_solicitud, $asignatura->codigo]);
        $cont++;

    }

    echo json_encode($res);
}



if ($method == 'DELETE') {
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: http://localhost:4201");
    header("Access-Control-Allow-Headers: *");

    if (empty($_GET['id_solicitud'])) {
        exit('no hay id de solicitud');
    }

    $id_solicitud = $_GET['id_solicitud'];

    $sql = $pdo->prepare('delete from solicitud where id = ?');
    $res = $sql->execute([$id_solicitud]);

    json_encode($res);
}



if ($method == 'PUT') {
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Headers: *");


    $json = json_decode(file_get_contents('php://input'));
    if (!$json) {
        exit('no hay datos');
    }



    $codigo_carrera = $json->codigo_carrera;
    $asignaturas = $json->asignaturas;
    $id_solicitud = $json->id_solicitud;

    $sql = $pdo->prepare("update solicitud set codigo_carrera = ? where id = ?");
    $sql->execute([$codigo_carrera, $id_solicitud]);

    $sql = $pdo->prepare("delete from detalle_solicitud where id_solicitud = ?");
    $sql->execute([$id_solicitud]);

    $res = [];
    $cont = 0;
    foreach ($asignaturas as $asignatura) {

        $sql = $pdo->prepare("insert into detalle_solicitud (id_solicitud, codigo_asignatura)
        values (?,?)");
        $res[$cont] = $sql->execute([$id_solicitud, $asignatura->codigo]);
        $cont++;

    }

    echo json_encode($res);

}


?>