import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarreraService } from '../../../services/carrera.service'
import {SolicitudService} from '../../../services/solicitud.service'
@Component({
  selector: 'app-seleccion-cursos',
  templateUrl: './seleccion-cursos.component.html',
  styleUrls: ['./seleccion-cursos.component.css']
})
export class SeleccionCursosComponent implements OnInit {


  asignaturas: any = []
  equivalencias: any = []
  currentInput: any;
  fileName: any;
  sizeFile: any;
  typeFile: any;

  errorType: any
  errorSize: any

  maxSizeFile: any = 3 //megabytes
  carrera_actual: any;
  unidad_academica_actual: any;
  extension_universitaria_actual : any

  destino : any
  constructor(
    private _router: Router,
    private carreraService: CarreraService,
    private solicitudService: SolicitudService
  ) { }

  ngOnInit(): void {
    this.getUnidadAcademicaActual()
    this.getExtensionUniversitariaActual()
    this.getCarreraActual()
    this.getCarreraExtensionUnidadDestino()

  }


  regresar() {
    this._router.navigate(['proceso-nuevo'])
  }

  // finalizar() {
  //   this._router.navigate(['inicio'])
  // }

  getUnidadAcademicaActual() {
    var unidad_academica = localStorage.getItem("ua_est")
    //var extension = localStorage.getItem("ext_est")

    this.carreraService.getUnidadAcademica(unidad_academica)
      .subscribe((res) => {
        this.unidad_academica_actual = res[0]
        console.log(this.unidad_academica_actual)
      },
        (error) => {
          console.error(error)
        })
  }

  getExtensionUniversitariaActual(){
    var unidad_academica = localStorage.getItem("ua_est")
    var extension = localStorage.getItem("ext_est")

    this.carreraService.getExtensionUniversitaria(extension, unidad_academica)
      .subscribe((res) => {
        this.extension_universitaria_actual = res[0]
        console.log(this.extension_universitaria_actual)
      },
        (error) => {
          console.error(error)
        })
  }

  getCarreraActual() {
    var unidad_academica = localStorage.getItem("ua_est")
    var extension = localStorage.getItem("ext_est")
    var carrera = localStorage.getItem("carrera_est")

    this.carreraService.getCarrera(unidad_academica, extension, carrera)
      .subscribe((res) => {
        this.carrera_actual = res[0]
        console.log(this.carrera_actual)
        this.getAsignaturas();
      },
        (error) => {
          console.error(error)
        })
  }

  getCarreraExtensionUnidadDestino(){
    var id_carrera = localStorage.getItem("id_carrera_destino")
    this.carreraService.getCarreraExtensionUnidad(id_carrera)
    .subscribe(
      (res) => {
        this.destino = res[0]

        console.log(this.destino)
      },
      (error) => {
        console.error(error)
      }
    )
  }

  getAsignaturas() {
    this.carreraService.getAsignaturas(this.carrera_actual.id)
      .subscribe(
        (res) => {
          this.asignaturas = res
        },
        (error) => {
          console.error(error)
        }
      )
  }



  getEquivalencias() {

    this.asignaturas.forEach((asignatura: { codigo: any; }) => {

      this.carreraService.getEquivalencias(asignatura.codigo, localStorage.getItem("id_carrera_destino"))
        .subscribe(
          (res) => {
            this.equivalencias.push(res)
          },
          (error) => {
            console.error(error)
          }
        )
    });

    console.log(this.equivalencias)

  }


  onFileSelected(event: any) {
    // console.log(event.target.files);
    this.errorSize = false
    this.errorType = false

    this.currentInput = event.target.files;
    this.fileName = this.currentInput[0].name
    this.sizeFile = this.currentInput[0].size
    this.typeFile = this.currentInput[0].type
    console.log(this.currentInput[0])
    if (this.sizeFile / 1000000 >= this.maxSizeFile) {
      //alert('sobrepasa el tamaño máximo')
      this.errorSize = true
    }
    if (this.typeFile != "application/pdf" && this.typeFile != "image/jpeg" && this.typeFile != "image/png") {
      //alert('debe ser de tipo pdf o jpg')
      this.errorType = true
    }



  }

  cursosMarcados: any = []
  fieldsChange(values: any): void {

    console.log(values.currentTarget.checked);
    console.log(values.currentTarget.value);
    if (values.currentTarget.checked) {
      this.cursosMarcados.push(values.currentTarget.value)
    } else {
      for (let index = 0; index < this.cursosMarcados.length; index++) {
        //const element = array[index];

        if (this.cursosMarcados[index] == values.currentTarget.value) {
          this.cursosMarcados.splice(index, 1)
        }

      }
    }

    console.log(this.cursosMarcados)
  }

  idCursos : any = []
  stringCursos : any=[]

  finalizar(){
    this.cursosMarcados.forEach((curso: any) => {
      var array = curso.split('$')
      this.idCursos.push({codigo:parseInt(array[0], 10)})
      this.stringCursos.push(array[1])
    });

    console.log(this.idCursos)
    console.log(this.stringCursos)

  }

  crearSolicitud(){



    var id_carrera = localStorage.getItem("id_carrera_destino")
    if(id_carrera != null){
      let data:any = {
        estudiante: localStorage.getItem("nombre_est"),
        registro_academico: localStorage.getItem("registro_est"),
        tipo:"equivalencia",
        codigo_carrera:parseInt(id_carrera, 10),
        asignaturas:this.idCursos
  
      }
  
  
      console.log(data)
      this.solicitudService.createSolicitud(data)
      .subscribe(
        (res) => {
          console.log('solicitud creada correctamente')
          this._router.navigate(['/inicio'])
        },
        (error) => {
          console.error(error)
        }
      )
    }
    
  }

  borrarListas(){
    this.cursosMarcados =[]
    this.idCursos =[]
    this.stringCursos =[]

    location.href = '/seleccion-cursos'
   // this._router.navigate(['/seleccion-cursos'])
  }
}
