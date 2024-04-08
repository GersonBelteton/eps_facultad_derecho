import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UntypedFormBuilder } from '@angular/forms';
import { AdministradorService } from '../../services/administrador.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _router: Router,
    private fb: UntypedFormBuilder,
    private administradorService: AdministradorService
  ) {

    this.dataForm = this.fb.group({
      usuario: [''],
      contrasena: ['']
    });
  }


  dataForm = this.fb.group({
    usuario: [''],
    contrasena: ['']
  });
  formData: UntypedFormGroup = new UntypedFormGroup({
    usuario: new UntypedFormControl(''),
    contrasena: new UntypedFormControl('')

  });
  ngOnInit(): void {
  }



  goInicio() {
    const data = this.dataForm.value;
    console.log(data.usuario)
    console.log(data.contrasena)

    let usuario = {
      api: "login",
      user: data.usuario,
      password: data.contrasena
    }
    this.administradorService.auth(usuario)
      .subscribe((res) => {
        if (res.length == 0) {
          alert('usuario incorrecto')
        } else {
          localStorage.setItem('current_id', res[0].id)
          this._router.navigate(['inicio'])
        }


      },
        (error) => {
          console.error(error)
        })
    //this._router.navigate(['dashboard'])
  }
}