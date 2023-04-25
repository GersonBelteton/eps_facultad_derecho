import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CarreraService} from '../../../services/carrera.service'
@Component({
  selector: 'app-seleccion-cursos',
  templateUrl: './seleccion-cursos.component.html',
  styleUrls: ['./seleccion-cursos.component.css']
})
export class SeleccionCursosComponent implements OnInit {


  asignaturas:any =[]
  equivalencias:any=[]
  currentInput: any;
  fileName: any;
  sizeFile: any;
  typeFile: any;

  errorType: any
  errorSize: any

  maxSizeFile: any = 3 //megabytes
  carrera_actual: any;
  centro_universitario_actual: any;
  constructor(
    private _router: Router,
    private carreraService: CarreraService
    ) { }

  ngOnInit(): void {
    this.getCentroUniversitarioActual()
    this.getCarreraActual()
    
  }


  regresar() {
    this._router.navigate(['proceso-nuevo'])
  }

  // finalizar() {
  //   this._router.navigate(['inicio'])
  // }

  getCentroUniversitarioActual() {
    var unidad_academica = localStorage.getItem("ua_est")
    var extension = localStorage.getItem("ext_est")

    this.carreraService.getCentroUniversitario(unidad_academica, extension)
      .subscribe((res) => {
        this.centro_universitario_actual = res[0]
        console.log(this.centro_universitario_actual)
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

  getAsignaturas(){
    this.carreraService.getAsignaturas(this.carrera_actual.id)
    .subscribe(
      (res)=>{
        this.asignaturas = res
      },
      (error)=>{
        console.error(error)
      }
    )
  }

  getEquivalencias(){

    this.asignaturas.forEach((asignatura: { codigo: any; }) => {
      
      this.carreraService.getEquivalencias(asignatura.codigo,localStorage.getItem("id_carrera_destino"))
      .subscribe(
        (res)=>{
          this.equivalencias.push(res)
        },
        (error)=>{
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
    this.fileName=this.currentInput[0].name
    this.sizeFile = this.currentInput[0].size
    this.typeFile = this.currentInput[0].type
    console.log(this.currentInput[0])
    if(this.sizeFile / 1000000 >= this.maxSizeFile){
      //alert('sobrepasa el tamaño máximo')
      this.errorSize = true
    }
    if(this.typeFile != "application/pdf" && this.typeFile != "image/jpeg" && this.typeFile != "image/png"){
      //alert('debe ser de tipo pdf o jpg')
      this.errorType = true
    }

  
    
  }

  fieldsChange(values:any):void {
    console.log(values.currentTarget.checked);
  }
}
