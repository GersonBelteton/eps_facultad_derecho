<?php

include('conexion.php');

$pdo = new conexion();


$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {

    header("Access-Control-Allow-Origin: http://localhost:4200");
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

        $sql = $pdo->prepare('select * from asignatura inner join detalle_solicitud on
        detalle_solicitud.codigo_asignatura = asignatura.codigo where id_solicitud = ?');
        $asignaturas = $sql->execute([$id_solicitud]);
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $asignaturas = $sql->fetchAll();
        echo json_encode([
            "solicitud" => $res,
            "asignaturas" => $asignaturas
        ], JSON_PRETTY_PRINT);
    }

    //exit('no hay id solicitud ni registro academico');
}

if ($method == 'POST') {
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Headers: *");

    $json = json_decode(file_get_contents('php://input'));
    if (!$json) {
        exit('no hay datos');
    }


    $estudiante = $json->estudiante;
    $registro = $json->registro_academico;
    $tipo = $json->tipo;
    $carrera = $json->codigo_carrera;
    $asignaturas = $json->asignaturas;

    $sql = $pdo->prepare("insert into solicitud (estudiante, registro_academico, tipo, estado, ruta_certificado_cursos, fecha_inicio, codigo_carrera)
    values (?,?,?,'NR','ruta',now(), ?)");
    $sql->execute([$estudiante, $registro, $tipo, $carrera]);
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