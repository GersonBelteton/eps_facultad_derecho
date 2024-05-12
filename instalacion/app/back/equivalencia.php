<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Allow: *");

include('conexion.php');

$pdo = new conexion();


$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {

    header("Access-Control-Allow-Origin: *");
    if (empty($_GET['id_carrera']) || empty($_GET['id_asignatura'])) {
        
        exit('no hay datos de suficientes');

    }

    if($_GET['equivalente']==1){
        $id_carrera = $_GET['id_carrera'];
        $id_asignatura = $_GET['id_asignatura'];
        $sql = $pdo->prepare("select equivalencia.id as id_equivalencia, asignatura.id, nombre, codigo_carrera, codigo_asignatura 
        from equivalencia inner join asignatura on codigo_asignatura2 = asignatura.id 
        where codigo_asignatura1 = ? and codigo_carrera = ?
        union
        select equivalencia.id as id_equivalencia, asignatura.id, nombre, codigo_carrera, codigo_asignatura 
        from equivalencia inner join asignatura on codigo_asignatura1 = asignatura.id 
        where codigo_asignatura2 = ? and codigo_carrera = ?;");
        $sql->execute([$id_asignatura, $id_carrera, $id_asignatura, $id_carrera ]);
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $resultado = $sql->fetchAll();
        echo json_encode($resultado, JSON_PRETTY_PRINT);
    }
    else{
        $id_carrera = $_GET['id_carrera'];
        $id_asignatura = $_GET['id_asignatura'];
        $sql = $pdo->prepare("select * from asignatura where codigo_carrera = ? 
        and nombre not in(
        select  nombre from equivalencia inner join asignatura on codigo_asignatura2 = asignatura.id 
        where codigo_asignatura1 = ? and codigo_carrera = ?
        union
        select  nombre  from equivalencia inner join asignatura on codigo_asignatura1 = asignatura.id 
        where codigo_asignatura2 = ? and codigo_carrera = ?
        )");
        $sql->execute([$id_carrera, $id_asignatura, $id_carrera, $id_asignatura, $id_carrera ]);
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        $resultado = $sql->fetchAll();
        echo json_encode($resultado, JSON_PRETTY_PRINT);
    }



}else if($method == 'POST'){
    header("Access-Control-Allow-Origin: *");

    $json = json_decode(file_get_contents("php://input"));
    if (!$json) {
        exit("No hay datos");
    }
    $sentencia = $pdo->prepare("insert into equivalencia (codigo_asignatura1, codigo_asignatura2) values(?,?);");
    $resultado = $sentencia->execute([$json->asignatura1, $json->asignatura2]);
    echo json_encode([
        "resultado" => $resultado,
        "id" => $pdo->lastInsertId()
    ]);
}else if($method == 'DELETE'){
    header("Access-Control-Allow-Origin: *");

    if (!empty($_GET['id_equivalencia'])) {
        $idEquivalencia = $_GET['id_equivalencia'];

        $sql = $pdo->prepare("DELETE FROM equivalencia WHERE id = ?;");
        $sql->execute([$idEquivalencia]);
    
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(), JSON_PRETTY_PRINT);
    

    }
}


?>