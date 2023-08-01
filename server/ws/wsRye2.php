<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Allow: *");

include 'conexion.php';

$pdo = new conexion();




$location = "https://registro.usac.edu.gt/WS/verificadatosRyEWebService1.php?wsdl";
$request = "<soapenv:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:nus=\"http://rye.usac.edu.gt/nusoap\">
<soapenv:Header/>
    <soapenv:Body>
        <nus:VerificaNuevos soapenv:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\">
            <xml_RegistraDatos xsi:type=\"xsd:string\">
        
              <![CDATA[
              <VERIFICAR_INSCRITO>
                     <DEPENDENCIA>UA04</DEPENDENCIA>

                     <UNIDAD_ACADEMICA>04</UNIDAD_ACADEMICA>

                     <EXTENSION>00</EXTENSION>

                     <CARRERA>01</CARRERA>

                     <LOGIN>S1s04D3r3ch0</LOGIN>

                     <PWD>a1021a89f5ead5615f16a5dcad38b38c91f5a197</PWD>

                     <CARNET>202380005</CARNET>

                     <CICLO>2022</CICLO>

                 </VERIFICAR_INSCRITO>
            
              ]]>

         </xml_RegistraDatos>
      </nus:VerificaNuevos>
    </soapenv:Body>
</soapenv:Envelope>";

print("Request: <br>");
print("<pre>".htmlentities($request)."</pre>");


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

//tipo de autorización
//curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_NTLM);//NTLM para webservices con dominios de windows
//curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);//AUTH BASIC para este caso
//curl_setopt($ch, CURLOPT_USERPWD, 'lucio:lucio'); //usuario:contraseña

$response = curl_exec($ch);
$err_status = curl_error($ch);

print("Response: <br>");
print("<pre>".$response."</pre>");

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

print("<br>_____________________________________________________________________<br>");

print_r($response);
print("<br>_____________________________________________________________________<br>");

$resp_inscrito = $response->Body->VerificaNuevosResponse->return->RESP_VERIFICAR_INSCRITO;
//print($response);
//print_r($response);



// print("Response: <br>");

// print("<br>");
// print($testxml);




// $tempLocalPath = "temp/data.xml";
// file_put_contents($tempLocalPath, $testxml);
// // $xml = simplexml_load_file($tempLocalPath);
// // print_r($xml);


//  $_DomObject = new DOMDocument;
//  $_DomObject->loadXML($response);
//  if (!$_DomObject) die("Error while parsing the document");
//  $s = simplexml_import_dom($_DomObject);
//  print("<br>_____________________________________________________________________<br>");
//  //print_r($_DomObject->documentElement->firstElementChild->firstElementChild->firstElementChild->nodeValue);
//  print_r($_DomObject->firstElementChild);
//  print("<br>_____________________________________________________________________<br>");
//  foreach(['CARNET','MSG','STATUS'] as $tag) {
//      echo $tag.' => '.$_DomObject->getElementsByTagName($tag)[0]->textContent.'<br/>';
//  }


?>