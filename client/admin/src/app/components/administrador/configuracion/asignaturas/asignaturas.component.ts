import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { EquivalenciaService } from '../../../../services/equivalencia.service'

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent implements OnInit {

  unidad:any
  extension:any
  carrera:any
  id_ua: any
  id_eu: any
  id_ca: any
  asignaturas: any = []

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
    this.id_ua = localStorage.getItem("conf-ua")
    this.id_eu = localStorage.getItem("conf-eu")
    this.id_ca = localStorage.getItem("conf-ca")
    this.getAsignaturas()
    this.getUnidad()
    this.getExtension()
    this.getCarrera()
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

  getAsignaturas() {
    this.equivalenciaService.getAsignaturas(this.id_ca)
      .subscribe((res) => {
        console.log(res)
        this.asignaturas = res
      }, (error) => {
        console.error(error)
      })
  }

  createAsignatura() {
    const data = this.dataForm.value;

    let asignatura = {

      codigo: data.codigo,
      nombre: data.nombre,
      id_ca: this.id_ca
    }

    this.equivalenciaService.createAsignatura(asignatura)
      .subscribe(
        (res) => {
          console.log(res)
          this.getAsignaturas()
        },
        (error) => {
          console.error(error)
        }
      )
  }

  deleteAsignatura(id: any) {
    this.equivalenciaService.deleteAsignatura(id)
      .subscribe((res) => {
        console.log(res)
        this.getAsignaturas()
      }, (error) => {
        console.error(error)
      })
  }



  guardar() {
    this.createAsignatura()
  }

  closeModal(){

  }

  regresar(){
    this._router.navigate(['configuracion-centros'])
  }

  goUsuarios(){
    this._router.navigate(['configuracion-usuario'])
  }

}
