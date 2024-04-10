import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from '../../../services/solicitud.service'
import { CarreraService } from '../../../services/carrera.service';
import { environment } from 'src/environments/environment'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'


pdfMake.vfs = pdfFonts.pdfMake.vfs


@Component({
  selector: 'app-revisar-proceso-activo',
  templateUrl: './revisar-proceso-activo.component.html',
  styleUrls: ['./revisar-proceso-activo.component.css']
})
export class RevisarProcesoActivoComponent implements OnInit {


  solicitud: any
  carreraActual: any
  carreraDestino: any
  id_solicitud: any



  constructor(
    private _router: Router,
    private solicitudService: SolicitudService,
    private carreraService: CarreraService
  ) { }

  ngOnInit(): void {
    this.getSolicitud()
  }


  getSolicitud() {

    this.id_solicitud = localStorage.getItem("id_sol")
    this.solicitudService.getSolicitud(this.id_solicitud)
      .subscribe((res) => {
        console.log(res)
        this.solicitud = res
        this.getCarreraActual()
        this.getCarreraDestino()
      },
        (error) => {
          console.log(error)
        })
  }


  getCarreraActual() {

    var id_carrera = this.solicitud.asignaturas[0].codigo_carrera
    this.carreraService.getCarreraExtensionUnidad(id_carrera)
      .subscribe((res) => {
        console.log(res)
        this.carreraActual = res[0]
      },
        (error) => {
          console.error(error)
        })

  }

  getCarreraDestino() {

    var id_carrera = this.solicitud.solicitud[0].codigo_carrera
    this.carreraService.getCarreraExtensionUnidad(id_carrera)
      .subscribe((res) => {
        console.log(res)
        this.carreraDestino = res[0]
      },
        (error) => {
          console.error(error)
        })

  }
  regresar() {
    this._router.navigate(['inicio'])
  }



  modificarEstadoSolicitud(estado:any) {
    let data = {
      id_solicitud: this.id_solicitud
    }
    this.solicitudService.updateEstadoSolicitud(data, estado)
      .subscribe((res) => {
        console.log(res)
      }, (error) => {
        console.error(error)
      })
  }



  margin: any = [30, 0]
  async crearPDF() {

    this.modificarEstadoSolicitud("IF");

    //var date = new Date()
    // var dia = date.getDate()
    var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    //var mes = meses[date.getMonth()]
    //var anio = date.getFullYear()

    var date = this.solicitud.solicitud[0].fecha_inicio.split(" ")[0]
    var anio = date.split("-")[0]
    var mes = meses[Number(date.split("-")[1]) - 1]
    var dia = date.split("-")[2]

    var cursosColumn1 = this.asignaturasToString()[0].toString();
    var cursosColumn2 = this.asignaturasToString()[1].toString();

    console.log(cursosColumn1)
    console.log(cursosColumn2)
    var dd2 = {
      content: [
        {
          text: 'UNIVERSIDAD DE SAN CARLOS DE GUATEMALA',
          style: 'header',
          alignment: 'center'

        },
        {
          text: 'DEPARTAMENTO DE REGISTRO Y ESTADISTICA',
          style: 'header',
          alignment: 'center'

        },
        { text: '\n', fontSize: 10 },
        {


          width: 80,
          opacity: 0.5,
          alignment: 'center',
          image: await this.getBase64ImageFromURL(
            "https://res.cloudinary.com/dst1u4bij/image/upload/v1680496240/logousac_fiqerk.jpg"
          )


        },
        { text: '\n', fontSize: 10 },
        {
          text: 'SOLICITUD DE EQUIVALENCIAS',
          fontSize: 16,
          style: 'header',
          alignment: 'center',
          bold: true

        },

        { text: '\n', fontSize: 10 },
        {
          text: 'Guatemala, ' + dia + ' de ' + mes + ' de ' + anio + '                                                       Carnet: ' + this.solicitud.solicitud[0].registro_academico,
          style: 'header',
          alignment: 'left'

        },
        { text: '\n', fontSize: 10 },

        { text: 'Señor Jefe', alignment: 'left', fontSize: 10 },
        { text: 'Departamento de Registro y Estadística', alignment: 'left', fontSize: 10 },
        { text: 'Ciudad Universitaria, Zona 12', alignment: 'left', fontSize: 10 },
        { text: '\n', fontSize: 5 },
        { text: 'Atentamente solicito a usted dar el trámite correspondiente al presente expediente, de aucerdo a los datos siguientes: ', preserveLeadingSpaces: true, alignment: 'left', fontSize: 10 },
        { text: '\n', fontSize: 10 },
        {
          text: 'NOMBRE COMPLETO:   ' + this.solicitud.solicitud[0].estudiante,
          style: 'header',
          alignment: 'left'

        },
        { text: '\n', fontSize: 10 },
        {
          text: 'DIRECCIÓN:__________________________________   TELÉFONO:____________________________________',
          style: 'header',
          alignment: 'left'

        },
        { text: '\n', fontSize: 10 },
        {
          columns: [



            {
              width: 520,
              alignment: 'justify',
              table: {
                widths: [520],
                body: [

                  [{ text: 'APROBÉ LOS CURSOS EN: ', bold: true, alignment: 'center' }],
                  [{ text: this.carreraActual.unidad_nombre + '        Universidad de San Carlos de Guatemala' },],
                  [{ text: 'SOLICITO EQUIVALENCIA DE CURSOS EN: ', bold: true, alignment: 'center' }],
                  [{ text: this.carreraDestino.unidad_nombre + '        Universidad de San Carlos de Guatemala' }],


                  // {


                  //     { text: '\n', fontSize: 10 },
                  //     { text: '\n', fontSize: 10 },

                  //     { text: '\n', fontSize: 10 },
                  //     { text: '\n', fontSize: 10 },
                  //     { text: '\n', fontSize: 10 },

                  //     { text: '\n', fontSize: 10 },
                  //     { text: '\n', fontSize: 10 },
                  //     { text: this.carreraDestino.unidad_nombre + '        Universidad de San Carlos de Guatemala' },
                  //     { text: '\n', fontSize: 10 },
                  //     { text: '\n', fontSize: 10 },
                  //     { text: '\n', fontSize: 10 },
                  //     //{ text: this.asignaturasToString()},
                  //     { text: '\n', fontSize: 10 },
                  //     { text: '\n', fontSize: 10 },
                  //     { text: 'OBSERVACIONES: ' },


                  // }


                  [{ text: 'NOMBRE DE LOS CURSOS APROBADOS: ', bold: true, alignment: 'center' }],
                  [


                    {
                      // text: [
                      //   { text: 'NOMBRE DE LOS CURSOS APROBADOS: ' },
                      //   { text: '\n', fontSize: 10 },
                      //   { text: '\n', fontSize: 10 },
                      // ],
                      columns: [
                        {
                          text: cursosColumn1
                        },
                        {
                          width: 10,
                          text: " "
                        },
                        {
                          text: cursosColumn2
                        }
                      ]
                    }
                  ],
                  [{ text: 'OBSERVACIONES: ', bold: true, alignment: 'center' }],
                  [{ text: '\n\n\n' }]
                ]
              }
            }
          ]
        },

        { text: '\n', fontSize: 10 },
        { text: '\n', fontSize: 10 },
        { qr: environment.frontPath + 'qr-revisar-activo?id_sol=' + this.id_solicitud, fit: '70' },
        {
          text: 'FIRMA DEL ESTUDIANTE:__________________________________',
          style: 'header',
          alignment: 'right'

        },
        { text: '\n', fontSize: 10 },
        { text: '\n', fontSize: 5 },
        { text: 'NOTA: De conformidad con los artículos 14o. y 47o. del Reglamento de Administración Estudiantil debe estar inscrito en el año que tramita sus equivalencias. ', alignment: 'justify', fontSize: 8 },
        { text: '\n', fontSize: 10 },
        { text: 'REQUISITOS PARA TRÁMITE DE EQUIVALENCIA DE CURSOS: ', alignment: 'justify', fontSize: 8 },
        { text: '1. Solicitud en formulario impreso. ', alignment: 'justify', fontSize: 8 },
        { text: '2. Certificación original de los cursos aprobados, extendida por la Unidad Académica, especificando punteo obtenido, fecha de examen y escala de calificaciones. ', alignment: 'justify', fontSize: 8 },
        { text: '3. Programas oficiales de estudio del ciclo académico en que fueron aprobados los cursos o programas debidamente sellados y firmados, por la autoridad correspondiente. ', alignment: 'justify', fontSize: 8 },

      ]
    }



    var dd = {
      content: [

        {


          width: 160,
          opacity: 0.5,
          image: await this.getBase64ImageFromURL(
            "https://res.cloudinary.com/dst1u4bij/image/upload/v1693255051/logousac_reportEPS.jpg"
          )


        },

        { text: '\n', fontSize: 10 },
        { text: '\n', fontSize: 10 },
        { text: '\n', fontSize: 10 },
        { text: '\n', fontSize: 10 },
        { text: '\n', fontSize: 10 },
        { text: '\n', fontSize: 10 },

        {
          text: 'DEPARTAMENTO DE REGISTRO Y ESTADISTICA',
          style: 'header',
          alignment: 'center'

        },
        { text: '\n', fontSize: 10 },
        {
          text: 'Guatemala, ' + dia + ' de ' + mes + ' de ' + anio,
          alignment: 'right',
          fontSize: 10,
          margin: [30, 0]
        },
        { text: '\n', fontSize: 10 },
        {
          text: [
            { text: 'EXPEDIENTE No ', fontSize: 10 },
            { text: this.solicitud.solicitud[0].id + '-' + anio, fontSize: 10, bold: true }

          ],
          alignment: 'right'
          , margin: [30, 0]

        },
        { text: '\n', fontSize: 10 },
        { text: 'Registro Académico: ' + this.solicitud.solicitud[0].registro_academico + '   CUI: ' + this.solicitud.solicitud[0].cui_pasaporte, fontSize: 10, bold: true, margin: [30, 0] },
        { text: '\n', fontSize: 5 },
        {
          text: [

            { text: 'Estudiante: ' },
            { text: this.solicitud.solicitud[0].estudiante, bold: true }
          ],
          fontSize: 10
          , margin: [30, 0]
        },
        { text: '\n', fontSize: 10 },
        { text: '\n', fontSize: 10 },
        { text: 'Solicita equivalencias de cursos aprobados en la/el:', fontSize: 10, margin: [30, 0] },
        { text: '\n', fontSize: 5 },
        { text: 'Centro Universitario de Noroccidente, Universidad de San Carlos de Guatemala', preserveLeadingSpaces: true, alignment: 'center', fontSize: 10, bold: true, margin: [30, 0] },
        { text: '\n', fontSize: 10 },
        { text: '\n', fontSize: 10 },
        { text: 'Para los cursos equivalentes en la/el: ', fontSize: 10, margin: [30, 0] },
        { text: '\n', fontSize: 5 },
        { text: 'Facultad de Ciencias Jurídicas y Sociales, Universidad de San Carlos de Guatemala', preserveLeadingSpaces: true, alignment: 'center', fontSize: 10, bold: true, margin: [30, 0] },
        { text: '\n', fontSize: 10 },
        { text: '\n', fontSize: 10 },
        { text: 'Para que resuelvan. Posteriormente remitir el expediente completo a este Departamento para notificar al estudiante la resolución respectiva.', fontSize: 10, margin: [30, 0] },
        { text: '\n', fontSize: 10 },
        { text: '\n', fontSize: 10 },
        { text: 'El expediente cuenta de 319 folios', fontSize: 10, margin: [30, 0] },
        { text: '\n', fontSize: 10 },
        { text: '\n', fontSize: 10 },
        { text: 'Se adjunta: Formulario de solicitud de equivalencias, certificaci´n de cursos, programas o fotocopia del catálogo de estudios sellados y firmados.', fontSize: 10, margin: [30, 0] },
        { text: '\n', fontSize: 5 },
        { text: '\"Id y Enseñad a Todos\"', preserveLeadingSpaces: true, alignment: 'center', fontSize: 10, bold: true },

        { text: '\n', fontSize: 10 },
        { text: '\n', fontSize: 10 },

        { text: 'UNIVERSIDAD DE SAN CARLOS DE GUATEMALA', alignment: 'center', fontSize: 10 },
        { text: 'DEPARTAMENTO DE REGISTRO Y ESTADÍSTICA', alignment: 'center', fontSize: 10, bold: true },
        { text: 'TRÁMITE DE EQUIVALENCIAS', alignment: 'center', fontSize: 10, bold: true }

      ]
    }

    const pdf = pdfMake.createPdf(dd2);
    pdf.open();
  }


  asignaturasToString() {
    var cont = 0
    var asignaturaString = ''
    var asignaturaString2 = ''
    this.solicitud.asignaturas.forEach(asignatura => {
      if (cont == 0) {
        asignaturaString += asignatura.codigo_asignatura + '-' + asignatura.nombre + '. \n'
        cont = 1;
      } else if (cont == 1) {
        asignaturaString2 += asignatura.codigo_asignatura + '-' + asignatura.nombre + '. \n'
        cont = 0;
      }


    });

    return [asignaturaString, asignaturaString2]
  }
  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }
}
