import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {EstudianteService} from '../../services/estudiante.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CarreraService } from '../../services/carrera.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  unidades_academicas: any = []
  extensiones_universitarias: any = []
  carreras: any = {}
  token: string|undefined;

  constructor(
    private _router: Router,
    private estudianteService: EstudianteService,
    private fb: FormBuilder,
    private carreraService: CarreraService
    ) {

    this.token = undefined;
    this.dataForm = this.fb.group({
      registro_academico: [''],
      pin: ['']
    });
  }

  dataForm = this.fb.group({
    registro_academico: [''],
    pin: ['']
  });
  formData: FormGroup = new FormGroup({
    registro_academico: new FormControl(''),
    pin: new FormControl('')

  });

  

  ngOnInit(): void {
    this.getUnidadesAcademicas();
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

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    console.debug(`Token [${this.token}] generated`);

    this.getEstudiante()
    //this.goInicio();
  }

  goInicio() {
    localStorage.setItem("nombre_est",this.estudiante.nombre)
    localStorage.setItem("registro_est",this.estudiante.registro_academico)
    localStorage.setItem("ua_est",this.estudiante.unidad_academica)
    localStorage.setItem("ext_est",this.estudiante.extension)
    localStorage.setItem("carrera_est", this.estudiante.carrera)
    this._router.navigate(['inicio'])
  }

  getUnidadesAcademicas() {
    this.carreraService.getAllUnidadesAcademicas()
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


  getEstudiante(){
    const data = this.dataForm.value;

    let estudiante = {

      registro_academico: data.registro_academico,
      unidad_academica: this.selectedUnidad,
      extension_universitaria: this.selectedExtension,
      carrera: this.selectedCarrera
    }

    this.estudianteService.getEstudiante(estudiante)
    .subscribe((res)=>{
      if(res.status == 1){

        this.estudiante=res
        console.log(this.estudiante)
  
        //this.goInicio();
      }else{
        alert(res.msg)
      }

    },
    (error)=>{
      alert('usuario incorrecto')
      console.error(error)
      
    })
  }


  estudiante : any = {
    nombre:"Luis Alberto Escobar Fernandez",
    registro_academico:"201807225",
    unidad_academica:"00",
    extension:"00",
    carrera:"8"
  }


}
