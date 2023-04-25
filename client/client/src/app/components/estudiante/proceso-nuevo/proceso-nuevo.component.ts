import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarreraService } from '../../../services/carrera.service'
@Component({
  selector: 'app-proceso-nuevo',
  templateUrl: './proceso-nuevo.component.html',
  styleUrls: ['./proceso-nuevo.component.css']
})
export class ProcesoNuevoComponent implements OnInit {

  centro_universitario_actual: any
  carrera_actual: any
  centros_universitarios: any = []
  carreras: any = {}
  constructor(private _router: Router,
    private carreraService: CarreraService
  ) { }

  ngOnInit(): void {
    this.getUnidadesAcademicas()
    this.getCentroUniversitarioActual()
    this.getCarreraActual()
  }

  siguiente() {

    this._router.navigate(['seleccion-cursos'])
  }

  regresar() {
    this._router.navigate(['inicio'])
  }

  getUnidadesAcademicas() {
    this.carreraService.getUnidadesAcademicas()
      .subscribe(
        (res) => {
          this.centros_universitarios = res
          console.log(this.centros_universitarios)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  getCarreras(id_unidad: any) {
    this.carreraService.gerCarreras(id_unidad)
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
      },
        (error) => {
          console.error(error)
        })
  }

  selectedUnidad = '';
  onSelected(value: string): void {
    this.selectedUnidad = value;
    console.log(this.selectedUnidad)
    this.getCarreras(this.selectedUnidad)
  }

  selectedCarrera = '';
  onSelected2(value: string): void {
    this.selectedCarrera = value;
    console.log(this.selectedCarrera)
    localStorage.setItem("id_carrera_destino", this.selectedCarrera)
  }

}
