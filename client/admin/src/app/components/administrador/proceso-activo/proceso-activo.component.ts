import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from '../../../services/solicitud.service'
import { EquivalenciaService } from '../../../services/equivalencia.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

pdfMake.vfs = pdfFonts.pdfMake.vfs

@Component({
  selector: 'app-proceso-activo',
  templateUrl: './proceso-activo.component.html',
  styleUrls: ['./proceso-activo.component.css']
})
export class ProcesoActivoComponent implements OnInit {

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
  tipoAutorizacionSeleccionada: any


  isCheckedAut: boolean = false
  isCheckedRegu: boolean = false
  isCheckedRegl: boolean = false


  constructor(private _router: Router,
    private solicitudService: SolicitudService,
    private fb: FormBuilder,
    private equivalenciaService: EquivalenciaService) {
    this.dataForm = this.fb.group({
      previo: [''],
    });
    this.dataFormReporte = this.fb.group({
      nombre: [''],
      carnet: [''],
      cui: [''],
      centro: [''],
      cohorte: [''],
      punto: [''],
      inciso: [''],
      acta: [''],
      diaSesion: [''],
      mesSesion: [''],
      anioSesion: [''],

    });
  }


  dataForm = this.fb.group({
    previo: [''],
  });
  formData: FormGroup = new FormGroup({
    previo: new FormControl(''),
  });

  dataFormReporte = this.fb.group({
    nombre: [''],
    carnet: [''],
    cui: [''],
    centro: [''],
    cohorte: [''],
    punto: [''],
    inciso: [''],
    acta: [''],
    diaSesion: [''],
    mesSesion: [''],
    anioSesion: [''],
  });
  formDataReporte: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    carnet: new FormControl(''),
    cui: new FormControl(''),
    centro: new FormControl(''),
    cohorte: new FormControl(''),
    punto: new FormControl(''),
    inciso: new FormControl(''),
    acta: new FormControl(''),
    diaSesion: new FormControl(''),
    mesSesion: new FormControl(''),
    anioSesion: new FormControl(''),
  });

  ngOnInit(): void {
    this.idSolicitud = localStorage.getItem('sol-id')
    // this.urlReporte = `http://localhost/ws/reporte.php?id_solicitud=${this.idSolicitud}`
    this.getSolicitud()
    this.getPrevios()
    this.getPreviosEstudiante()


  }




  handleChangeAutorizacion() {
    //doSelected(target);
    console.log("hola, esta marcado autorización jejej")
    this.tipoAutorizacionSeleccionada = "autorizada";
  }

  handleChangeRegularizacion() {

    console.log("hola, esta marcado regularización jejej")
    this.tipoAutorizacionSeleccionada = "regularizada";
  }

  handleChangeReglamentacion() {

    console.log("hola, esta marcado reglamentación jejej")
    this.tipoAutorizacionSeleccionada = "reglamentada";
  }

  validarAutorizacion() {
    const data = this.dataFormReporte.value;

    console.log(data)
    console.log(this.carreraActual.unidad_id + " " + data.cohorte)
    this.equivalenciaService.getAutorizacion(this.carreraActual.unidad_id, data.cohorte)
      .subscribe((res) => {
        console.log(res)


        var fecha = res.datos.fecha.split(" ");
        this.dataFormReporte.patchValue(

          {
            punto: res.datos.punto,
            inciso: res.datos.inciso,
            acta: res.datos.acta,
            diaSesion: fecha[0],
            mesSesion: fecha[1],
            anioSesion: fecha[2]
          }
        )

        if (res.msg == "AUTORIZACION") {
          console.log("marcar autorización")
          this.isCheckedAut = true;
          this.tipoAutorizacionSeleccionada = "autorizada"
          console.log("marcar regularizacion")
          this.handleChangeRegularizacion()
        } else if (res.msg == "REGULARIZACION") {
          this.isCheckedRegu = true;
          this.tipoAutorizacionSeleccionada = "regularizada"
        } else if (res.msg == "REGLAMENTACION") {
          this.isCheckedRegl = true;
          this.tipoAutorizacionSeleccionada = "reglamentada"
        }



      }, (error) => {
        console.error(error)
      })
  }


  finalizar() {
    var res;
    var status;
    if (this.previos_estudiante.length > 0) {
      res = "No Aprobado"
      status = "DPP"
    } else {
      res = "Aprobado",
        status = "PF"
    }
    let body = {
      id_solicitud: this.idSolicitud,
      resultado: res,
      estado: status,
    }

    this.solicitudService.finalizarSolicitud(body)
      .subscribe((res) => {
        console.log(res)
        this._router.navigate(['/inicio'])
      }, (error) => {
        console.error(error)
      })
  }
  previosMarcados: any = []
  fieldsChange(values: any): void {
    console.log(values.currentTarget.checked);
    console.log(values.currentTarget.value);
    if (values.currentTarget.checked) {
      this.previosMarcados.push(values.currentTarget.value)
      this.setSatusPrevio(values.currentTarget.value, true)
    } else {
      this.setSatusPrevio(values.currentTarget.value, false)
      for (let index = 0; index < this.previosMarcados.length; index++) {
        //const element = array[index];

        if (this.previosMarcados[index] == values.currentTarget.value) {
          this.previosMarcados.splice(index, 1)
        }

      }
    }

    console.log(this.statusPrevio)
    console.log(this.previosMarcados)

  }

  statusPrevio: any = []

  llenarStatusPrevio() {
    this.statusPrevio = []
    this.previos.forEach((previo: any) => {
      this.statusPrevio.push({ id: previo.id, selected: false })
    });
  }

  desmarcarCheckBox() {
    this.statusPrevio.forEach((item: any) => {
      item.selected = false;
    });

    console.log(this.statusPrevio)
  }

  setSatusPrevio(id: any, status: boolean) {
    this.statusPrevio.forEach((item: any) => {
      if (item.id == id) {
        item.selected = status
      }
    });
  }

  getStatusPrevio(id: any) {
    this.statusPrevio.forEach((item: any) => {
      if (item.id == id) {
        console.log(item.selected)
        return item.selected
      }
    });
  }

  idPrevios: any = []
  enviarPrevios() {
    this.previosMarcados.forEach((previo: any) => {
      this.idPrevios.push({ id: parseInt(previo, 10) })

    });

    console.log(this.idPrevios)

    let previos = {
      id_solicitud: this.idSolicitud,
      previos: this.idPrevios
    }

    this.solicitudService.createDetallePrevio(previos)
      .subscribe((res) => {
        console.log(res)
        this.idPrevios = []
        this.previosMarcados = []
        //this.llenarStatusPrevio()
        //this.desmarcarCheckBox()
        this.getPrevios()
        this.getPreviosEstudiante()
      }, (error) => {
        console.error(error)
      })


  }


  borrarPrevio(id_previo: any) {
    this.solicitudService.deletePrevio(id_previo)
      .subscribe((res) => {
        console.log(res)
        this.getPrevios()
      }, (error) => {
        console.error(error)
      })
  }

  borrarPrevioEstudiante(id_detalle_previo: any) {
    this.solicitudService.deleteDetallePrevio(id_detalle_previo)
      .subscribe((res) => {
        console.log(res)
        this.getPreviosEstudiante()
      }, (error) => {
        console.error(error)
      })
  }

  crearPrevio() {
    const data = this.dataForm.value;

    console.log(data.previo)

    let previo = {
      descripcion: data.previo
    }

    this.solicitudService.createPrevio(previo)
      .subscribe((res) => {
        console.log(res)
        this.getPrevios()

        this.dataForm.patchValue(
          { previo: '' }
        )

      }, (error) => {
        console.error(error)
      })
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

        this.dataFormReporte.patchValue(

          {
            nombre: this.solicitud.solicitud[0].estudiante,
            carnet: this.formatoCarnet(this.solicitud.solicitud[0].registro_academico),
            cui: this.formatoCUI(this.solicitud.solicitud[0].cui_pasaporte),
            centro: this.carreraActual.unidad_nombre
          }
        )
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
        this.llenarStatusPrevio()
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



  formatoCarnet(carnet: any) {
    var carnetF = '';

    for (var i = 0; i < carnet.length; i++) {
      carnetF += carnet.substring(i, i + 1);
      if (i == 3) {
        carnetF += '-'
      }
    }

    return carnetF
  }

  formatoCUI(cui: any) {
    var cuiF = '';

    for (var i = 0; i < cui.length; i++) {
      cuiF += cui.substring(i, i + 1);
      if (i == 3 || i == 8) {
        cuiF += ' '
      }
    }

    return cuiF
  }


  modificarEstadoSolicitud() {
    let data = {
      id_solicitud: this.idSolicitud
    }
    this.solicitudService.updateEstadoSolicitud(data, "GR")
      .subscribe((res) => {
        console.log(res)
      }, (error) => {
        console.error(error)
      })
  }
  margin: any = [30, 0]

  async crearPDF() {

    this.modificarEstadoSolicitud();

    const data = this.dataFormReporte.value;
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
                        { text: 'Br. ' + data.nombre + ', ', fontSize: 10, bold: true },
                        { text: 'Registro Académico No. ', fontSize: 10 },
                        { text: data.carnet, fontSize: 10, bold: true },
                        { text: ', CUI: ', fontSize: 10 },
                        { text: data.cui, fontSize: 10, bold: true },
                        { text: ' y estudiante de la carrera de Licenciatura en Ciencias Jurídicas y Sociales, Abogacía y Notariado de ' + data.centro + '. ', fontSize: 10 },
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
            { text: 'Br. ' + data.nombre + ', ', preserveLeadingSpaces: true, fontSize: 10, bold: true },
            { text: 'Registro Académico No. ', preserveLeadingSpaces: true, fontSize: 10 },
            { text: data.carnet + ', ', preserveLeadingSpaces: true, fontSize: 10, bold: true },
            { text: 'CUI: ', preserveLeadingSpaces: true, fontSize: 10 },
            { text: data.cui + ' ', preserveLeadingSpaces: true, fontSize: 10, bold: true },
            { text: 'y estudiante de la carrera de Licenciatura en Ciencias Jurídicas y Sociales, Abogacía y Notariado de ' + data.centro + '; respetuosamente me dirijo a ustedes con el objeto de trasladar información de la situación académico-administrativa del solicitante, conforme a la información consultada en el Departamento de Registro y Estadística de la Universidad de San Carlos de Guatemala. ', preserveLeadingSpaces: true, fontSize: 10 },

          ]
        },
        { text: '\n', fontSize: 10 },
        {
          alignment: 'justify',
          margin: this.margin,
          text: [
            { text: '\t\t\tEn este sentido, me permito indicar ', preserveLeadingSpaces: true, fontSize: 10 },
            { text: data.nombre + ', ', preserveLeadingSpaces: true, fontSize: 10, bold: true },
            { text: 'Registro Académico No. ', preserveLeadingSpaces: true, fontSize: 10 },
            { text: data.carnet + ', ', preserveLeadingSpaces: true, fontSize: 10, bold: true },
            { text: 'CUI: ', preserveLeadingSpaces: true, fontSize: 10 },
            { text: data.cui + ' ', preserveLeadingSpaces: true, fontSize: 10, bold: true },
            { text: 'y estudiante de la carrera de Licenciatura en Ciencias Jurídicas y Sociales, Abogacía y Notariado de ' + data.centro + '; pertenece a la COHORTE ' + data.cohorte + ' de la carrera de Licenciatura en Ciencias Jurídicas y Sociales, Abogacía y Notariado de ' + data.centro + ' la cual de conformidad con la legislación universitaria ', preserveLeadingSpaces: true, fontSize: 10 },
            { text: 'sí se encuentra '+this.tipoAutorizacionSeleccionada+' ', preserveLeadingSpaces: true, fontSize: 10, bold: true, decoration: 'underline' },
            { text: 'según Punto ' + data.punto + ', inciso ' + data.inciso + ' del Acta ' + data.acta + ', de la sesión celebrada por el Consejo Superior Universitario, el ' + data.diaSesion + ' de ' + data.mesSesion + ' de ' + data.anioSesion + '.', preserveLeadingSpaces: true, fontSize: 10 },


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
