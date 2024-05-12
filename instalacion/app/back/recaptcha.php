<?php

// Checking valid form is submitted or not


// Storing name in $name variable

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('content-type: application/json; charset=utf-8');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');  

    $json = json_decode(file_get_contents('php://input'));

    if (!$json) {
        exit('no hay datos');
    }

    $token = $json->token;
    //$name = $_POST['name'];

    // Storing google recaptcha response
    // in $recaptcha variable
    $recaptcha = $token;

    // Put secret key here, which we get
    // from google console
    $secret_key = '6Lc0MZIlAAAAAH9DXg8Sh7dR8Q7nB8py9uRF6ZZm';

    // Hitting request to the URL, Google will
    // respond with success or error scenario
    $url = 'https://www.google.com/recaptcha/api/siteverify?secret='. $secret_key . '&response=' . $recaptcha;

    // Making request to verify captcha
    $response = file_get_contents($url);

    // Response return by google is in
    // JSON format, so we have to parse
    // that json
    //$response = json_decode($response);

    echo $response;
    // Checking, if response is true or not
    // if ($response->success == true) {
    //     echo '<script>alert("Google reCAPTACHA verified")</script>';
    // } else {
    //     echo '<script>alert("Error in Google reCAPTACHA")</script>';
    // }

}


?>