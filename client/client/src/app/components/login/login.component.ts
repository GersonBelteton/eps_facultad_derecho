import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {EstudianteService} from '../../services/estudiante.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  token: string|undefined;

  constructor(
    private _router: Router,
    private estudianteService: EstudianteService,
    private fb: FormBuilder
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

  getEstudiante(){
    const data = this.dataForm.value;

    this.estudianteService.getEstudiante(data.registro_academico, data.pin)
    .subscribe((res)=>{
      if(res.length == 0){
        alert('usuario incorrecto')
      }else{
        this.estudiante=res[0]
        console.log(this.estudiante)
  
        this.goInicio();
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
