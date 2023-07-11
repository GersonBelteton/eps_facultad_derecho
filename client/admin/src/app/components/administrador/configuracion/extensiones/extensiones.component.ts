import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { EquivalenciaService } from '../../../../services/equivalencia.service'

@Component({
  selector: 'app-extensiones',
  templateUrl: './extensiones.component.html',
  styleUrls: ['./extensiones.component.css']
})
export class ExtensionesComponent implements OnInit {

  extensiones: any = []
  unidad: any
  id_ua: any
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
    this.id_ua = localStorage.getItem('conf-ua')
    this.getUnidad()
    this.getExtensiones()
  }


  closeModal(){

  }

  guardar(){
    this.createExtension()
  }

  goCarreras(id:any){
    localStorage.setItem('conf-eu',id)
    this._router.navigate(['configuracion-carreras'])
  }

  createExtension() {
    const data = this.dataForm.value;

    let extension = {

      codigo: data.codigo,
      nombre: data.nombre,
      id_ua: this.id_ua
    }

    this.equivalenciaService.createExtension(extension)
      .subscribe(
        (res) => {
          console.log(res)
          this.getExtensiones()
        },
        (error) => {
          console.error(error)
        }
      )
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

  getExtensiones() {

    this.equivalenciaService.getExtensiones(this.id_ua)
      .subscribe((res) => {
        console.log(res)
        this.extensiones = res
      }, (error) => {
        console.error(error)
      })
  }

  deleteExtension(id: any) {
    this.equivalenciaService.deleteExtension(id)
      .subscribe((res) => {
        console.log(res)
        this.getExtensiones()
      }, (error) => {
        console.error(error)
      })
  }

}
