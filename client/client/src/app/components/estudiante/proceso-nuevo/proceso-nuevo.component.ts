import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CarreraService} from '../../../services/carrera.service'
@Component({
  selector: 'app-proceso-nuevo',
  templateUrl: './proceso-nuevo.component.html',
  styleUrls: ['./proceso-nuevo.component.css']
})
export class ProcesoNuevoComponent implements OnInit {

  unidades_academicas:any=[]
  carreras:any={}
  constructor(private _router: Router,
      private carreraService: CarreraService
    ) { }

  ngOnInit(): void {
    this.getUnidadesAcademicas()
  }

  siguiente(){
    
    this._router.navigate(['seleccion-cursos'])
  }

  regresar(){
    this._router.navigate(['inicio'])
  }

  getUnidadesAcademicas(){
    this.carreraService.getUnidadesAcademicas()
    .subscribe(
      (res) =>{
        this.unidades_academicas = res
        console.log(this.unidades_academicas)
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  getCarreras(id_unidad:any){
    this.carreraService.gerCarreras(id_unidad)
    .subscribe(
      (res) =>{
        this.carreras = res
        console.log(this.carreras)
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  selectedUnidad = '';
	onSelected(value:string): void {
		this.selectedUnidad = value;
    console.log(this.selectedUnidad)
    this.getCarreras(this.selectedUnidad)
	}

  selectedCarrera = '';
	onSelected2(value:string): void {
		this.selectedCarrera = value;
    console.log(this.selectedCarrera)
    localStorage.setItem("id_carrera_destino", this.selectedCarrera )
	}

}
