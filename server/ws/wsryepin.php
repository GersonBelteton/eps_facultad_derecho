<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Allow: *");


if ($_SERVER['REQUEST_METHOD'] == 'POST') {


    header("Access-Control-Allow-Origin: * ");

    $json = json_decode(file_get_contents('php://input'));
    if (!$json) {
        exit('no hay datos');
    }


    $pin = $json->pin;
    $carnet = $json->registro_academico;


    $response = consulta_RYE($carnet, $pin);


    header("HTTP/1.1 200 OK");
    echo json_encode([
        "status" => (string)$response->STATUS,
        "msg" => (string)$response->MSG,
    ],JSON_PRETTY_PRINT, JSON_UNESCAPED_UNICODE);



}

function consulta_RYE($carnet, $pin){

    $location = "https://registro.usac.edu.gt/WS/verificadatosRyEWebService1.php?wsdl";
    $request = "<soapenv:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:nus=\"http://rye.usac.edu.gt/nusoap\">
    <soapenv:Header/>
        <soapenv:Body>
            <nus:VerificaPIN soapenv:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\">
                <xml_verificaPIN xsi:type=\"xsd:string\">
                  <![CDATA[
                  	<VERIFICAR_PIN>
			            <DEPENDENCIA>UA04</DEPENDENCIA>
			            <LOGIN>S1s04D3r3ch0</LOGIN>
			            <PWD>a1021a89f5ead5615f16a5dcad38b38c91f5a197</PWD>
			            <CARNET>".$carnet."</CARNET>
			            <PIN>".$pin."</PIN>
		            </VERIFICAR_PIN>
                  ]]>
             </xml_verificaPIN>
          </nus:VerificaPIN>
        </soapenv:Body>
    </soapenv:Envelope>";
    
    $action = "VerificaPIN";
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
    
    $resp_verificar_pin = $response->Body->VerificaPINResponse->return->RESP_VERIFICAR_PIN;

    return $resp_verificar_pin;
}





?>