import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarreraService } from '../../../services/carrera.service'
@Component({
  selector: 'app-proceso-nuevo',
  templateUrl: './proceso-nuevo.component.html',
  styleUrls: ['./proceso-nuevo.component.css']
})
export class ProcesoNuevoComponent implements OnInit {

  unidad_academica_actual: any
  extension_universitaria_actual : any
  carrera_actual: any
  unidades_academicas: any = []
  extensiones_universitarias: any = []
  carreras: any = {}
  origen:any
  constructor(private _router: Router,
    private carreraService: CarreraService
  ) { }

  ngOnInit(): void {
    this.getUnidadesAcademicas()
    this.getUnidadAcademicaActual()
    this.getExtensionUniversitariaActual()
    this.getCarreraActual()
  }

  siguiente() {

    if(this.selectedUnidad && this.selectedExtension && this.selectedCarrera){
      this._router.navigate(['seleccion-cursos'])
    }else{
      alert("Debes seleccionar Unidad Académica, Extensión Universitaria y Carrera")
    }
    
  }

  regresar() {
    this._router.navigate(['inicio'])
  }

  getUnidadesAcademicas() {
    if(localStorage.getItem("ua_est")=="04"){
      this.origen="campus_central"
    }else{
      this.origen="centro_regional"
    }
    this.carreraService.getUnidadesAcademicas(this.origen)
      .subscribe(
        (res) => {
          this.unidades_academicas = res
          console.log(this.unidades_academicas)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  getExtensiones(id_unidad: any) {
    this.carreraService.getExtensionesUniversitarias(id_unidad)
      .subscribe(
        (res) => {
          this.extensiones_universitarias = res
          console.log(this.extensiones_universitarias)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  getCarreras(id_extension: any) {
    this.carreraService.gerCarreras(id_extension)
      .subscribe(
        (res) => {
          this.carreras = res
          console.log(this.carreras)
        },
        (error) => {
          console.log(error)
        }
      )
  }

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
      },
        (error) => {
          console.error(error)
        })
  }

  selectedUnidad = '';
  onSelected(value: string): void {
    this.selectedUnidad = value;
    console.log(this.selectedUnidad)
    this.getExtensiones(this.selectedUnidad)
  }


  selectedExtension = '';
  onSelected2(value: string): void {
    this.selectedExtension = value;
    console.log(this.selectedExtension)
    this.getCarreras(this.selectedExtension)
  }

  selectedCarrera = '';
  onSelected3(value: string): void {
    this.selectedCarrera = value;
    console.log(this.selectedCarrera)
    localStorage.setItem("id_carrera_destino", this.selectedCarrera)
  }




}
