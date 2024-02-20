import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { EquivalenciaService } from '../../../../services/equivalencia.service'

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {

  unidades: any = []
  unidad:any
  updateModal: boolean = false
  constructor(
    private _router: Router,
    private equivalenciaService: EquivalenciaService,
    private fb: FormBuilder
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
  formData: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    codigo: new FormControl(''),

  });

  ngOnInit(): void {
    this.getUnidades()
  }

  openUpdateModal(id:any){
    this.updateModal = true

    this.equivalenciaService.getUnidad(id)
    .subscribe((res)=>{
      console.log(res)
      this.unidad=res[0]

      this.dataForm.patchValue(

        {
          nombre: this.unidad.nombre,
          codigo: this.unidad.codigo,
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

  guardar() {

    if(this.updateModal){
      this.updateUnidad()
    }else if(!this.updateModal){
      this.createUnidad()
    }

  }

  goExtensiones(id:any){
    localStorage.setItem('conf-ua',id)
    this._router.navigate(['configuracion-extensiones'])
  }



  goAutorizacion(){
    this._router.navigate(['configuracion-autorizacion'])
  }


  updateUnidad(){
    const data = this.dataForm.value;

    let unidad = {
      id: this.unidad.id,
      codigo: data.codigo,
      nombre: data.nombre
    }

    this.equivalenciaService.updateUnidad(unidad)
      .subscribe(
        (res) => {
          console.log(res)
          this.getUnidades()
        },
        (error) => {
          console.error(error)
        }
      )
  }
  createUnidad() {
    const data = this.dataForm.value;

    let unidad = {

      codigo: data.codigo,
      nombre: data.nombre
    }

    this.equivalenciaService.createUnidad(unidad)
      .subscribe(
        (res) => {
          console.log(res)
          this.getUnidades()
        },
        (error) => {
          console.error(error)
        }
      )
  }

  getUnidades() {
    this.equivalenciaService.getUnidades()
      .subscribe((res) => {
        console.log(res)
        this.unidades = res
      },
        (error) => {
          console.error(error)
        })
  }

  deleteUnidad(id: any) {
    this.equivalenciaService.deleteUnidad(id)
      .subscribe((res) => {
        console.log(res)
        this.getUnidades()
      }, (error) => {
        console.error(error)
      })
  }

}
