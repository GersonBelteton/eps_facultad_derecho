<?php

require('./fpdf/fpdf.php');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Allow: *");







class PDF extends FPDF
{


   function Header()
   {
      //include '../../recursos/Recurso_conexion_bd.php';//llamamos a la conexion BD

      //$consulta_info = $conexion->query(" select *from hotel ");//traemos datos de la empresa desde BD
      //$dato_info = $consulta_info->fetch_object();





        include 'conexion.php';
        header("Access-Control-Allow-Origin: *");

        $pdo = new conexion();
        $nombre;

        if ($_SERVER['REQUEST_METHOD'] == 'GET') {


            header("Access-Control-Allow-Origin: http://localhost:4201");


            $idSolicitud = $_GET['id_solicitud'];
            //$idCarrera = $json->idCarrera;

            $sql = $pdo->prepare("select * from solicitud where id = ?");
            $sql->execute([$idSolicitud]);
            $resultado= $sql->setFetchMode(PDO::FETCH_ASSOC);

            $resultado=$sql->fetchAll();
            header("HTTP/1.1 200 OK");

            //echo($resultado[0]['estudiante']);

            $nombre = $resultado[0]['estudiante'];
            $registro_academico = $resultado[0]['registro_academico'];
            date_default_timezone_set('America/Mexico_City');
            $año = date('Y');
            $dia = date('d');

            $meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
            $mes = $meses[date('n')-1];
        }



      $this->Image('fpdf/logousac.jpg', 5, 5, 55); //logo de la empresa,moverDerecha,moverAbajo,tamañoIMG

      $this->SetTextColor(0, 0, 0); //color

      $this->SetFont('Arial', 'B', 8); //tipo fuente, negrita(B-I-U-BIU), tamañoTexto
      $this->Cell(65); // Movernos a la derecha
      $this->Cell(110, 6, utf8_decode('SUPERVISIÓN ACADÉMICA DE LAS ESCUELAS DE DERECHO DEPARTAMENTALES'), 0, 1, 'C', 0); 

      $this->Cell(65); // Movernos a la derecha
      $this->SetFont('Arial', '', 7); //tipo fuente, negrita(B-I-U-BIU), tamañoTexto
      $this->Cell(110, 2, utf8_decode('Oficina 233, 2º. Nivel del Edificio S-7.  Ciudad Universitaria, zona 12.  Teléfonos. 2418-8422 y 2418-8400; Ext. 85086.'), 0, 1, 'C', 0); 
      
      $this->Cell(65); // Movernos a la derecha
      $this->SetFont('Arial', 'B', 10);
      $this->Cell(110, 2, utf8_decode('____________________________________________________________________'), 0, 1, 'C', 0); 
      $this->Ln(20); // Salto de línea
  
      $this->SetTextColor(48, 0, 0);
      $this->Cell(150); // Movernos a la derecha
      $this->SetFont('Arial', 'B', 10); //tipo fuente, negrita(B-I-U-BIU), tamañoTexto
      $this->Write(5,utf8_decode("SAEDD-000-2023")); 
      $this->Ln(6);

      $this->SetTextColor(0, 0, 0);
      $this->Cell(70); // Movernos a la derecha
      $this->SetFont('Arial', '', 9); //tipo fuente, negrita(B-I-U-BIU), tamañoTexto
      $this->MultiCell(110, 5, utf8_decode("ASUNTO: Información de Br.".$nombre.", Registro Académico No. ".$registro_academico.", CUI: XXXX XXXXX XXXX y estudiante de la carrera de Licenciatura en Ciencias Jurídicas y Sociales, Abogacía y Notariado del Centro  Universitario de XXX (CUNXXX)."),1,'J',false);
      $this->Ln(2);

      $this->Cell(130); // Movernos a la derecha
      $this->SetFont('Arial', '', 9); //tipo fuente, negrita(B-I-U-BIU), tamañoTexto
      $this->Write(5,utf8_decode("Guatemala, ".$dia." de ".$mes." de ".$año)); 
      $this->Ln(20);

      $this->Cell(20); // Movernos a la derecha
      $this->SetFont('Arial', '', 9); //tipo fuente, negrita(B-I-U-BIU), tamañoTexto
      $this->Write(5,utf8_decode("Señores Miembros de ")); 
      $this->Ln(5);
      $this->Cell(20); // Movernos a la derecha
      $this->SetFont('Arial', 'B', 9);
      $this->Write(5,utf8_decode("JUNTA DIRECTIVA")); 
      $this->Ln(5);
      $this->Cell(20); // Movernos a la derecha
      $this->SetFont('Arial', '', 9);
      $this->Write(5,utf8_decode("Facultad de Ciencias Jurídicas y Sociales.")); 
      $this->Ln(5);
      $this->Cell(20); // Movernos a la derecha
      $this->Write(5,utf8_decode("Ciudad Universitaria, zona 12.")); 
      $this->Ln(15);

      $this->Cell(20); // Movernos a la derecha
      $this->Write(5,utf8_decode("Honorable Junta Directiva:")); 
      $this->Ln(8); // Salto de línea


      $this->Cell(20); // Movernos a la derecha
      $this->SetFont('Arial', '', 9); //tipo fuente, negrita(B-I-U-BIU), tamañoTexto
      $this->MultiCell(160, 5, utf8_decode("    A requerimiento de la Secretaría Académica de la Facultad de Ciencias Jurídicas y Sociales de la Universidad de San Carlos de Guatemala y con base a la solicitud de equivalencia de cursos formulada por Información de Br. NOMBRE COMPLETO, Registro Académico No. XXXX- XXXXX, CUI: XXXX XXXXX XXXX y estudiante de la carrera de Licenciatura en Ciencias Jurídicas y Sociales, Abogacía y Notariado del Centro Universitario de XXX (CUNXXX); respetuosamente me dirijo a ustedes con el objeto de trasladar información de la situación académico-administrativa del solicitante, conforme a la información consultada en el Departamento de Registro y Estadística de la Universidad de San Carlos de Guatemala. "),0,'J',false);
      $this->Ln(2);

      $this->Cell(20); // Movernos a la derecha
      $this->SetFont('Arial', '', 9); //tipo fuente, negrita(B-I-U-BIU), tamañoTexto
      $this->MultiCell(160, 5, utf8_decode("    En este sentido, me permito indicar NOMBRE COMPLETO, Registro Académico No. XXXX- XXXXX, CUI: XXXX XXXXX XXXX y estudiante de la carrera de Licenciatura en Ciencias Jurídicas y Sociales, Abogacía y Notariado del Centro Universitario de XXX (CUNXXX); pertenece a la COHORTE 20XX de la carrera de Licenciatura en Ciencias Jurídicas y Sociales, Abogacía y Notariado del Centro Universitario de XXXX (CUNXXX) la cual de conformidad con la legislación universitaria sí se encuentra autorizada según Punto XXXX, inciso XX.X del Acta XX-XXXX, de la sesión celebrada por el Consejo Superior Universitario, el XX de noviembre de XXXX."),0,'J',false);
      $this->Ln(5);

      $this->Cell(30); // Movernos a la derecha
      $this->Write(5,utf8_decode("Atentamente,")); 
      $this->Ln(15);

      $this->SetFont('Arial', 'B', 9); //tipo fuente, negrita(B-I-U-BIU), tamañoTexto
      $this->MultiCell(200, 5, utf8_decode("ID Y ENSEÑAD A TODOS"),0,'C',false);
      $this->Ln(20);

      $this->SetFont('Arial', 'B', 9); //tipo fuente, negrita(B-I-U-BIU), tamañoTexto
      $this->MultiCell(200, 5, utf8_decode("Licda. Valeska Ivonné Ruiz Echeverría"),0,'C',false);

      $this->SetFont('Arial', '', 9); //tipo fuente, negrita(B-I-U-BIU), tamañoTexto
      $this->MultiCell(200, 5, utf8_decode("Supervisora Académica de las"),0,'C',false);

      $this->SetFont('Arial', '', 9); //tipo fuente, negrita(B-I-U-BIU), tamañoTexto
      $this->MultiCell(200, 5, utf8_decode("Escuelas de Derecho Departamentales"),0,'C',false);

      $this->Cell(20); // Movernos a la derecha
      $this->SetFont('Arial', '', 5);
      $this->Write(5,utf8_decode("c.c. Correlativo SAEDD")); 
      $this->Ln(2); // Salto de línea
      $this->Cell(20);
      $this->Write(5,utf8_decode("SAEDD/vire 2023")); 
      $this->Ln(2);
      $this->Cell(20); // Movernos a la derecha
      $this->SetFont('Arial', 'B', 9);
      $this->Write(5,utf8_decode("________________________________")); 
      $this->Ln(5);

      $this->Cell(20); 
      $this->SetFont('Arial', '', 7); //tipo fuente, negrita(B-I-U-BIU), tamañoTexto
      $this->MultiCell(160, 5, utf8_decode("ADJUNTO: Consulta electrónica realizada al Departamento de Registro y Estadística de la Universidad de San Carlos de Guatemala con fecha XX de febrero de 2023 y expediente de mérito (378 folios)."),0,'J',false);



   }

   // Pie de página
   function Footer()
   {
      $this->SetY(-15); // Posición: a 1,5 cm del final
      $this->SetFont('Arial', 'I', 8); //tipo fuente, negrita(B-I-U-BIU), tamañoTexto
      $this->Cell(0, 10, utf8_decode('Página ') . $this->PageNo() . '/{nb}', 0, 0, 'C'); //pie de pagina(numero de pagina)

      $this->SetY(-15); // Posición: a 1,5 cm del final
      $this->SetFont('Arial', 'I', 8); //tipo fuente, cursiva, tamañoTexto
      $hoy = date('d/m/Y');
      $this->Cell(355, 10, utf8_decode($hoy), 0, 0, 'C'); // pie de pagina(fecha de pagina)
   }
}


$pdf = new PDF();
$pdf->AddPage(); /* aqui entran dos para parametros (horientazion,tamaño)V->portrait H->landscape tamaño (A3.A4.A5.letter.legal) */
$pdf->AliasNbPages(); //muestra la pagina / y total de paginas

$i = 0;
$pdf->SetFont('Arial', '', 12);
$pdf->SetDrawColor(163, 163, 163);

$pdf->Output('Prueba.pdf', 'I');
