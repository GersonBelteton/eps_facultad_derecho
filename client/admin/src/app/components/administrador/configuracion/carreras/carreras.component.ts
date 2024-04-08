import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UntypedFormBuilder } from '@angular/forms';
import { EquivalenciaService } from '../../../../services/equivalencia.service'

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {

  unidad:any
  extension:any
  id_ua: any
  id_eu: any
  carreras: any = []
  updateModal: boolean = false
  carrera: any

  constructor(
    private _router: Router,
    private equivalenciaService: EquivalenciaService,
    private fb: UntypedFormBuilder
  ) {
    this.dataForm = this.fb.group({
      nombre: [''],
      codigo: [''],
    });
  }

  dataForm = this.fb.group({
    nombre: [''],
    codigo: [''],
  });
  formData: UntypedFormGroup = new UntypedFormGroup({
    nombre: new UntypedFormControl(''),
    codigo: new UntypedFormControl(''),

  });



  ngOnInit(): void {
    this.id_ua = localStorage.getItem("conf-ua")
    this.id_eu = localStorage.getItem("conf-eu")
    this.getCarreras()
    this.getExtension()
    this.getUnidad()
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

  getCarreras() {
    this.equivalenciaService.getCarreras(this.id_eu)
      .subscribe((res) => {
        console.log(res)
        this.carreras = res
      }, (error) => {
        console.error(error)
      })
  }

  createCarrera() {
    const data = this.dataForm.value;

    let carrera = {

      codigo: data.codigo,
      nombre: data.nombre,
      id_eu: this.id_eu
    }

    this.equivalenciaService.createCarrera(carrera)
      .subscribe(
        (res) => {
          console.log(res)
          this.getCarreras()
        },
        (error) => {
          console.error(error)
        }
      )
  }

  updateCarrera(){
    const data = this.dataForm.value
    let carrera ={
      id:this.carrera.id,
      nombre:data.nombre,
      codigo:data.codigo
    }

    this.equivalenciaService.updateCarrera(carrera)
    .subscribe((res)=>{
      console.log(res)
      this.getCarreras()
    },(error)=>{
      console.error(error)
    })
  }
  deleteCarrera(id: any) {
    this.equivalenciaService.deleteCarrera(id)
      .subscribe((res) => {
        console.log(res)
        this.getCarreras()
      }, (error) => {
        console.error(error)
      })
  }

  goAsignaturas(id:any){
    localStorage.setItem('conf-ca',id)
    this._router.navigate(['configuracion-asignaturas'])
  }


  guardar() {
    if(this.updateModal){
      this.updateCarrera()
    }else{
      this.createCarrera()
    }
    
  }


  openUpdateModal(id:any){
    this.updateModal = true

    this.equivalenciaService.getCarrera(id)
    .subscribe((res)=>{
      console.log(res)
      this.carrera = res[0]
      this.dataForm.patchValue(

        {
          nombre: this.carrera.nombre,
          codigo: this.carrera.codigo,
        }
      )
    },(error)=>{
      console.error(error)
    })
  }

  openCreateModal(){
    this.updateModal = false

    this.dataForm.patchValue(

      {
        nombre: '',
        codigo: '',
      }
    )
  }
  closeModal() {

  }




  regresar() {
    this._router.navigate(['configuracion-centros'])
  }

  goUsuarios() {
    this._router.navigate(['configuracion-usuario'])
  }
}
