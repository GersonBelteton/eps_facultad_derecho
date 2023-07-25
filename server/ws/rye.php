<?php


$url = 'https://secure.softwarekey.com/solo/webservices/XmlCustomerService.asmx?WSDL';
$client = new SoapClient($url);

$xmlr = new SimpleXMLElement("<CustomerSearch></CustomerSearch>");
$xmlr->addChild('AuthorID', $authorID);
$xmlr->addChild('UserID', $userID);
$xmlr->addChild('UserPassword', $userPassword);
$xmlr->addChild('Email', $customerEmail);

$params = new stdClass();
$params->xml = $xmlr->asXML();

$result = $client->CustomerSearchS($params);



?>