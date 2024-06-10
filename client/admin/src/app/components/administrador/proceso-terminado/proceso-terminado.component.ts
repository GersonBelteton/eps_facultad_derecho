import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from '../../../services/solicitud.service'
import { EquivalenciaService } from '../../../services/equivalencia.service'
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UntypedFormBuilder } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

pdfMake.vfs = pdfFonts.pdfMake.vfs


@Component({
  selector: 'app-proceso-terminado',
  templateUrl: './proceso-terminado.component.html',
  styleUrls: ['./proceso-terminado.component.css']
})
export class ProcesoTerminadoComponent implements OnInit {

  solicitud: any
  idSolicitud: any
  carreraActual: any
  carreraDestino: any
  equivalencias: any = []
  previos: any = []
  previos_estudiante: any = []
  urlReporte: any
  mostrarCuadroPrevios: boolean = false
  isChecked: boolean = false

  constructor(private _router: Router,
    private solicitudService: SolicitudService,
    private fb: UntypedFormBuilder,
    private equivalenciaService: EquivalenciaService) {
    this.dataForm = this.fb.group({
      previo: [''],
    });
  }


  dataForm = this.fb.group({
    previo: [''],
  });
  formData: UntypedFormGroup = new UntypedFormGroup({
    previo: new UntypedFormControl(''),
  });


  ngOnInit(): void {
    this.idSolicitud = localStorage.getItem('sol-id')
    this.urlReporte = `http://localhost/ws/reporte.php?id_solicitud=${this.idSolicitud}`
    this.getSolicitud()
    this.getPrevios()
    this.getPreviosEstudiante()

    
  }

  

  

 


  
 

  

  getEquivalencias() {

    this.solicitud.asignaturas.forEach((asignatura: { id: any; }) => {

      this.equivalenciaService.getEquivalentes(asignatura.id, this.solicitud.solicitud[0].codigo_carrera)
        .subscribe(
          (res) => {
            console.log(res)

            let asignaturas = res

            asignaturas.forEach((asignatura: any) => {
              let asig = {
                codigo_asignatura: asignatura.codigo_asignatura,
                nombre: asignatura.nombre
              }
              let inList = false

              this.equivalencias.forEach((eq: any) => {
                if (eq.codigo_asignatura == asig.codigo_asignatura) {
                  inList = true
                  return;
                }
              });
              if (!inList) {
                this.equivalencias.push(asig)
              }

            });
            //this.equivalencias.push(res)

            console.log(this.equivalencias)
          },
          (error) => {
            console.error(error)
          }
        )
    });



  }




  getCarreraActual() {

    var id_carrera = this.solicitud.asignaturas[0].codigo_carrera
    this.solicitudService.getCarreraExtensionUnidad(id_carrera)
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
    this.solicitudService.getCarreraExtensionUnidad(id_carrera)
      .subscribe((res) => {
        console.log(res)
        this.carreraDestino = res[0]
      },
        (error) => {
          console.error(error)
        })

  }

  getSolicitud() {

    this.solicitudService.getSolicitud(this.idSolicitud)
      .subscribe((res) => {
        this.solicitud = res
        console.log(this.solicitud)
        this.getCarreraActual()
        this.getCarreraDestino()
        this.getEquivalencias()
      },
        (error) => {
          console.error(error)
        })
  }



  getPrevios() {

    this.solicitudService.getAllPrevios()
      .subscribe((res) => {
        console.log(res)
        this.previos = res
        console.log(this.previos)
      }, (error) => {
        console.error(error)
      })
  }

  getPreviosEstudiante() {

    this.solicitudService.getPrevios(this.idSolicitud)
      .subscribe((res) => {
        console.log(res)
        this.previos_estudiante = res
        if (this.previos_estudiante.length > 0) {
          this.mostrarCuadroPrevios = true
        } else {
          this.mostrarCuadroPrevios = false
        }
      }, (error) => {
        console.error(error)
      })
  }

  regresar() {
    this._router.navigate(['inicio'])
  }



  margin: any = [30, 0]

  async crearPDF() {


   // const data = this.dataFormReporte.value;

   var fecha
   var punto 
   var inciso 
   var acta 
   var diaSesion 
   var mesSesion 
   var anioSesion 
   var tipo 

   var unidad = this.carreraActual.unidad_nombre
   var nombre = this.solicitud.solicitud[0].estudiante
   var carnet = this.solicitud.solicitud[0].registro_academico
   var cui = this.solicitud.solicitud[0].cui_pasaporte

   console.log("validar autorizacion adentro")
  var cohorte = this.solicitud.solicitud[0].cohorte
   console.log(this.carreraActual.unidad_id + " " +cohorte)
   this.equivalenciaService.getAutorizacion(this.carreraActual.unidad_id, cohorte)
     .subscribe((res) => {
       console.log(res)


       fecha = res.datos.fecha.split(" ");
       punto = res.datos.punto
       inciso = res.datos.inciso
       acta = res.datos.acta
       diaSesion = fecha[0]
       mesSesion = fecha[1]
       anioSesion = fecha[2]
       tipo = res.msg

     }, (error) => {
       console.error(error)
     })

    var date = new Date()
    var dia = date.getDate()
    var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    var mes = meses[date.getMonth()]
    var anio = date.getFullYear()
    var dd = {
      content: [
        {

          columns:
            [
              {

                width: 160,
                opacity: 0.5,
                image: await this.getBase64ImageFromURL(
                  "https://res.cloudinary.com/dst1u4bij/image/upload/v1693255051/logousac_reportEPS.jpg"
                )

              },
              {

              },
              {
                text: [
                  '\n',
                  { text: 'SUPERVISIÓN ACADÉMICA DE LAS ESCUELAS DE DERECHO DEPARTAMENTALES\n', fontSize: 9, bold: true },
                  { text: 'Oficina 233, 2º. Nivel del Edificio S-7. Ciudad Universitaria, zona 12. Teléfonos. 2418-8422 y 2418-8400; Ext. 85086\n', fontSize: 7 },
                  { text: '__________________________________________________________________', bold: true }
                ],

                width: 400,
                alignment: 'center',
                opacity: 0.5
              }
            ],
          margin: [-10, 0]


        },
        {
          text: `\n\nSAEDD-APP-${this.idSolicitud}-${anio}`,
          alignment: 'right',
          color: '#310000',
          bold: true
        },
        { text: '\n', fontSize: 5 },
        {
          columns: [
            {

            },
            {
              width: 320,
              alignment: 'justify',
              table: {
                widths: [320],
                body: [
                  [
                    {
                      text: [
                        { text: 'ASUNTO: ', fontSize: 10, decoration: 'underline', },
                        { text: 'Información de ', fontSize: 10 },
                        { text: 'Br. ' + nombre + ', ', fontSize: 10, bold: true },
                        { text: 'Registro Académico No. ', fontSize: 10 },
                        { text: carnet, fontSize: 10, bold: true },
                        { text: ', CUI: ', fontSize: 10 },
                        { text: cui, fontSize: 10, bold: true },
                        { text: ' y estudiante de la carrera de Licenciatura en Ciencias Jurídicas y Sociales, Abogacía y Notariado de ' + unidad + '. ', fontSize: 10 },
                      ]

                    }

                  ],
                ]
              }
            }
          ]
        },
        { text: '\n', fontSize: 10 },
        {
          text: 'Guatemala, ' + dia + ' de ' + mes + ' de ' + anio + '',
          alignment: 'right',
          fontSize: 10

        },
        { text: '\n\n\n', fontSize: 10 },

        {
          stack: [
            {
              text: 'Señores Miembros de ',
              alignment: 'left',
              fontSize: 10,
            },
            {
              text: 'JUNTA DIRECTIVA',
              alignment: 'left',
              fontSize: 10,
              bold: true
            },
            {
              text: 'Facultad de Ciencias Jurídicas y Sociales.',
              alignment: 'left',
              fontSize: 10
            },
            {
              text: 'Ciudad Universitaria, zona 12.',
              alignment: 'left',
              fontSize: 10
            },
          ],
          margin: this.margin
        },

        { text: '\n\n', fontSize: 10 },
        {
          text: 'Honorable Junta Directiva:',
          alignment: 'left',
          fontSize: 10,
          margin: this.margin
        },
        { text: '\n\n', fontSize: 10 },
        {
          alignment: 'justify',
          margin: this.margin,
          text: [
            { text: '\t\t\tA requerimiento de la Secretaría Académica de la Facultad de Ciencias Jurídicas y Sociales de la Universidad de San Carlos de Guatemala y con base a la solicitud de equivalencia de cursos formulada por Información de ', preserveLeadingSpaces: true, fontSize: 10 },
            { text: 'Br. ' + nombre + ', ', preserveLeadingSpaces: true, fontSize: 10, bold: true },
            { text: 'Registro Académico No. ', preserveLeadingSpaces: true, fontSize: 10 },
            { text: carnet + ', ', preserveLeadingSpaces: true, fontSize: 10, bold: true },
            { text: 'CUI: ', preserveLeadingSpaces: true, fontSize: 10 },
            { text: cui + ' ', preserveLeadingSpaces: true, fontSize: 10, bold: true },
            { text: 'y estudiante de la carrera de Licenciatura en Ciencias Jurídicas y Sociales, Abogacía y Notariado de ' + unidad + '; respetuosamente me dirijo a ustedes con el objeto de trasladar información de la situación académico-administrativa del solicitante, conforme a la información consultada en el Departamento de Registro y Estadística de la Universidad de San Carlos de Guatemala. ', preserveLeadingSpaces: true, fontSize: 10 },

          ]
        },
        { text: '\n', fontSize: 10 },
        {
          alignment: 'justify',
          margin: this.margin,
          text: [
            { text: '\t\t\tEn este sentido, me permito indicar ', preserveLeadingSpaces: true, fontSize: 10 },
            { text: nombre + ', ', preserveLeadingSpaces: true, fontSize: 10, bold: true },
            { text: 'Registro Académico No. ', preserveLeadingSpaces: true, fontSize: 10 },
            { text: carnet + ', ', preserveLeadingSpaces: true, fontSize: 10, bold: true },
            { text: 'CUI: ', preserveLeadingSpaces: true, fontSize: 10 },
            { text: cui + ' ', preserveLeadingSpaces: true, fontSize: 10, bold: true },
            { text: 'y estudiante de la carrera de Licenciatura en Ciencias Jurídicas y Sociales, Abogacía y Notariado de ' + unidad + '; pertenece a la COHORTE ' + cohorte + ' de la carrera de Licenciatura en Ciencias Jurídicas y Sociales, Abogacía y Notariado de ' + unidad + ' la cual de conformidad con la legislación universitaria ', preserveLeadingSpaces: true, fontSize: 10 },
            { text: 'sí se encuentra ' + tipo + ' ', preserveLeadingSpaces: true, fontSize: 10, bold: true, decoration: 'underline' },
            { text: 'según Punto ' + punto + ', inciso ' + inciso + ' del Acta ' + acta + ', de la sesión celebrada por el Consejo Superior Universitario, el ' + diaSesion + ' de ' + mesSesion + ' de ' + anioSesion + '.', preserveLeadingSpaces: true, fontSize: 10 },


          ]
        },
        { text: '\n', fontSize: 10 },
        {
          text: '\t\t\t\tAtentamente, ',
          alignment: 'left',
          fontSize: 10,
          preserveLeadingSpaces: true
        },
        { text: '\n', fontSize: 10 },
        {
          text: '"ID Y ENSEÑAD A TODOS"',
          alignment: 'center',
          fontSize: 10,
          bold: true,
          preserveLeadingSpaces: true
        },
        { text: '\n\n\n\n\n\n', fontSize: 10 },
        {
          text: 'Licda. Valeska Ivonné Ruiz Echeverría',
          alignment: 'center',
          fontSize: 10,
          bold: true,
          preserveLeadingSpaces: true
        },
        {
          text: 'Supervisora Académica de las',
          alignment: 'center',
          fontSize: 9,
        },
        {
          text: 'Escuelas de Derecho Departamentales',
          alignment: 'center',
          fontSize: 9,
        },
        {
          text: 'c.c. Correlativo SAEDD',
          alignment: 'left',
          fontSize: 6,
        },
        {
          text: 'SAEDD/vire ' + anio,
          alignment: 'left',
          fontSize: 6,
        },
        {
          text: '__________________________________________',
          alignment: 'left',
          bold: true,
          fontSize: 10,
        },
        { text: '\n', fontSize: 10 },
        {
          text: [
            { text: 'ADJUNTO: ', preserveLeadingSpaces: true, fontSize: 10, bold: true },
            { text: 'Consulta electrónica realizada al Departamento de Registro y Estadística de la Universidad de San Carlos de Guatemala con fecha ' + dia + ' de ' + mes + ' de ' + anio + ' y expediente de mérito (378 folios).', preserveLeadingSpaces: true, fontSize: 10 },

          ]
        }



      ]

    }

    const pdf = pdfMake.createPdf(dd);
    pdf.open();
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
