<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Allow: *");

include 'conexion.php';

$pdo = new conexion();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {


    header("Access-Control-Allow-Origin: * ");

    $json = json_decode(file_get_contents('php://input'));
    if (!$json) {
        exit('no hay datos');
    }


    $unidad = $json->unidad_academica;
    $extension = $json->extension_universitaria;
    $carrera = $json->carrera;
    $carnet = $json->registro_academico;

    date_default_timezone_set('America/Mexico_City');
    $año = date('Y');
    $ciclo = $año;
    $ciclo = intval($ciclo);

    do{
        $response = consulta_RYE($unidad, $extension, $carrera, $carnet, $ciclo);
        $ciclo = $ciclo -1;
    }while($response->STATUS == 2 && $ciclo > 2010);
    


    header("HTTP/1.1 200 OK");
    echo json_encode([
        "status" => (string)$response->STATUS,
        "msg" => (string)$response->MSG,
        "datos"=>[
            "nombre"=>iconv('utf-8', 'latin1', $response->DATOS->NOMBRES)." ".iconv('utf-8', 'latin1', $response->DATOS->APELLIDOS),
            "cui_pasaporte"=>(string)$response->DATOS->CUI_PASAPORTE,
            "carnet" => (string)$response->DATOS->CARNET
        ]
    ],JSON_PRETTY_PRINT, JSON_UNESCAPED_UNICODE);



}

function consulta_RYE($unidad, $extension, $carrera, $carnet, $ciclo){

    $location = "https://registro.usac.edu.gt/WS/verificadatosRyEWebService1.php?wsdl";
    $request = "<soapenv:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:nus=\"http://rye.usac.edu.gt/nusoap\">
    <soapenv:Header/>
        <soapenv:Body>
            <nus:VerificaNuevos soapenv:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\">
                <xml_RegistraDatos xsi:type=\"xsd:string\">
                  <![CDATA[
                  <VERIFICAR_INSCRITO>
                         <DEPENDENCIA>UA".$unidad."</DEPENDENCIA>
                         <UNIDAD_ACADEMICA>".$unidad."</UNIDAD_ACADEMICA>
                         <EXTENSION>".$extension."</EXTENSION>
                         <CARRERA>".$carrera."</CARRERA>
                         <LOGIN>S1s04D3r3ch0</LOGIN>
                         <PWD>a1021a89f5ead5615f16a5dcad38b38c91f5a197</PWD>
                         <CARNET>".$carnet."</CARNET>
                         <CICLO>".$ciclo."</CICLO>
                     </VERIFICAR_INSCRITO>
                  ]]>
             </xml_RegistraDatos>
          </nus:VerificaNuevos>
        </soapenv:Body>
    </soapenv:Envelope>";
    
    $action = "VerificaNuevos";
    $headers = [
        'Method: POST',
        'Connection: Keep-Alive',
        'User-Agent: PHP-SOAP-CURL',
        'Content-Type: text/xml; charset=utf-8',
        'SOAPAction: "VerificaNuevos"',
    ];
    
    
    $ch = curl_init($location);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $request);
    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    
    $response = curl_exec($ch);
    $err_status = curl_error($ch);
    
    $response = str_replace ('SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/"',
     '', $response);
     $response = str_replace ('SOAP-ENV:','', $response);
     $response = str_replace ('xmlns:ns1="http://rye.usac.edu.gt/nusoap"','', $response);
     $response = str_replace ('xsi:type="xsd:string"','', $response);
     $response = str_replace ('ns1:','', $response);
     $response = str_replace ('&lt;','<', $response);
     $response = str_replace ('&gt;','>', $response);
    
     $response = simplexml_load_string ($response, "SimpleXMLElement", LIBXML_NOCDATA);
    
    
    //$feed = new SimpleXMLElement($response);
    
    //print("<br>_____________________________________________________________________<br>");
    //
    //print_r($response);
    //print("<br>_____________________________________________________________________<br>");
    
    $resp_inscrito = $response->Body->VerificaNuevosResponse->return->RESP_VERIFICAR_INSCRITO;

    return $resp_inscrito;
}





?>