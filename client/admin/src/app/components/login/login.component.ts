import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AdministradorService } from '../../services/administrador.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _router: Router,
    private fb: FormBuilder,
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
  formData: FormGroup = new FormGroup({
    usuario: new FormControl(''),
    contrasena: new FormControl('')

  });
  ngOnInit(): void {
  }



  goInicio() {
    const data = this.dataForm.value;
    console.log(data.usuario)
    console.log(data.contrasena)

    let usuario = {
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