import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { EquivalenciaService } from '../../../../services/equivalencia.service'

@Component({
  selector: 'app-equivalencias',
  templateUrl: './equivalencias.component.html',
  styleUrls: ['./equivalencias.component.css']
})
export class EquivalenciasComponent implements OnInit {

  selectUnidades:any=[]
  selectExtensiones:any=[]
  selectCarreras:any=[]
  asignaturasEquivalentes:any=[]
  asignaturasNoEquivalentes:any=[]
  unidad:any
  extension:any
  carrera:any
  asignatura:any
  constructor(
    private _router: Router,
    private equivalenciaService: EquivalenciaService,
    private fb: FormBuilder
  ) { }

  id_ua:any
  id_eu:any
  id_ca:any
  id_as:any
  ngOnInit(): void {
    this.id_ua = localStorage.getItem("conf-ua")
    this.id_eu = localStorage.getItem("conf-eu")
    this.id_ca = localStorage.getItem("conf-ca")
    this.id_as = localStorage.getItem("conf-as")
    //this.getAsignaturas()
    this.getUnidad()
    this.getExtension()
    this.getCarrera()
    this.getAsignatura()
    this.getUnidades()
  }


  onSelectedUnidades(value: string): void {
 
    this.getExtensiones(value)
  }

  onSelectedExtensiones(value: string): void {
 
    this.getCarreras(value)
  }

  carrera_selected:any
  onSelectedCarreras(value: string): void {
 
    console.log(value)
    this.carrera_selected = value
    this.getEquivalentes(this.carrera_selected)
    this.getNoEquivalentes(this.carrera_selected)
  }

  deleteEquivalencia(id: any) {
    this.equivalenciaService.deleteEquivalencia(id)
      .subscribe((res) => {
        console.log(res)
        this.getEquivalentes(this.carrera_selected)
        this.getNoEquivalentes(this.carrera_selected)
      }, (error) => {
        console.error(error)
      })
  }

  createAsignatura(id_as2:any) {


    let equivalencia = {
      asignatura1:this.id_as,
      asignatura2:id_as2
    }

    this.equivalenciaService.createEquivalencia(equivalencia)
      .subscribe(
        (res) => {
          console.log(res)
          this.getEquivalentes(this.carrera_selected)
          this.getNoEquivalentes(this.carrera_selected)
        },
        (error) => {
          console.error(error)
        }
      )
  }

  getEquivalentes(id_carrera:any){
    console.log(this.id_as, " ", id_carrera)
    this.equivalenciaService.getEquivalentes(this.id_as, id_carrera)
    .subscribe((res) => {
      console.log(res)
      this.asignaturasEquivalentes = res
    }, (error) => {
      console.error(error)
    })
  }

  getNoEquivalentes(id_carrera:any){
    console.log(this.id_as, " ", id_carrera)
    this.equivalenciaService.getNoEquivalentes(this.id_as, id_carrera)
    .subscribe((res) => {
      console.log(res)
      this.asignaturasNoEquivalentes = res
    }, (error) => {
      console.error(error)
    })
  }




  getCarreras(id:any){
    this.equivalenciaService.getCarreras(id)
    .subscribe((res)=>{
      console.log(res)
      this.selectCarreras= res
    },(error)=>{
      console.error(error)
    })
  }
  getExtensiones(id:any){
    this.equivalenciaService.getExtensiones(id)
    .subscribe((res)=>{
      console.log(res)
      this.selectExtensiones= res
    },(error)=>{
      console.error(error)
    })
  }

  getUnidades(){
    this.equivalenciaService.getUnidades()
    .subscribe((res)=>{
      console.log(res)
      this.selectUnidades= res
    },(error)=>{
      console.error(error)
    })
  }

  getUnidad(){

    this.equivalenciaService.getUnidad(this.id_ua)
    .subscribe((res)=>{
      console.log(res)
      this.unidad=res[0]
    },(error)=>{
      console.error(error)
    })
  }

  getExtension() {
    console.log(this.id_eu)
    this.equivalenciaService.getExtension(this.id_eu)
      .subscribe((res) => {
        console.log(res)
        this.extension = res[0]
      }, (error) => {
        console.error(error)
      })
  }

  getCarrera(){
    this.equivalenciaService.getCarrera(this.id_ca)
    .subscribe((res) => {
      console.log(res)
      this.carrera = res[0]
    }, (error) => {
      console.error(error)
    })
  }

  getAsignatura(){
    this.equivalenciaService.getAsignatura(this.id_as)
    .subscribe((res) => {
      console.log(res)
      this.asignatura = res[0]
    }, (error) => {
      console.error(error)
    })
  }

  regresar(){
    this._router.navigate(['configuracion-asignaturas'])
  }

  goUsuarios(){
    this._router.navigate(['configuracion-usuario'])
  }
}
