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

  codigo_unidad: any
  codigo_extension: any
  codigo_carrera:any

  active_spinner:boolean = false
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
  onSelected(value: any): void {
    this.selectedUnidad = value;
    console.log(this.selectedUnidad)
    let array = this.selectedUnidad.split("-")
    this.codigo_unidad = array[1]
    this.getExtensiones(array[0])
  }


  selectedExtension = '';
  onSelected2(value: any): void {
    this.selectedExtension = value;
    console.log(this.selectedExtension)
    let array = this.selectedExtension.split("-")
    this.codigo_extension = array[1]
    this.getCarreras(array[0])
  }

  selectedCarrera = '';
  onSelected3(value: string): void {
    this.selectedCarrera = value;
    console.log(this.selectedCarrera)
    let array = this.selectedCarrera.split("-")
    this.codigo_carrera = array[1]
  }

  public send(form: NgForm): void {
    this.active_spinner = true;
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
    //localStorage.setItem("estudiante",'{"nombre":"'+this.estudiante.nombre+'","registro_academico":"'+this.estudiante.registro_academico+'", "cui_pasaporte":"'+this.estudiante.cui_pasaporte+'"}')
    localStorage.setItem("nombre_est",this.estudiante.nombre)
    localStorage.setItem("registro_est",this.estudiante.registro_academico)
    localStorage.setItem("cui_est",this.estudiante.cui_pasaporte)
    localStorage.setItem("ua_est",this.estudiante.unidad_academica)
    localStorage.setItem("ext_est",this.estudiante.extension_universitaria)
    localStorage.setItem("carrera_est", this.estudiante.carrera)

    console.log("VE A INICIO")
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
      unidad_academica: this.codigo_unidad,
      extension_universitaria: this.codigo_extension,
      carrera: this.codigo_carrera
    }

    console.log(estudiante)
    this.estudianteService.auth(estudiante)
    .subscribe((res)=>{
      console.log(res)
      if(res.status == 1){

        this.estudiante.nombre=res.datos.nombre
        this.estudiante.registro_academico = res.datos.carnet
        this.estudiante.cui_pasaporte = res.datos.cui_pasaporte
        this.estudiante.unidad_academica = this.codigo_unidad
        this.estudiante.extension_universitaria = this.codigo_extension
        this.estudiante.carrera = this.codigo_carrera
        console.log(this.estudiante)
  
        this.goInicio();
      }else{
        this.active_spinner = false
        alert(res.msg)
      }

    },
    (error)=>{
      this.active_spinner = false
      alert('usuario incorrecto')
      console.error(error)
      
    })
  }


  estudiante : any = {
    nombre:"",
    registro_academico:"",
    cui_pasaporte:"",
    unidad_academica:"",
    extensiones_universitarias:"",
    carrera:""
  }


}
