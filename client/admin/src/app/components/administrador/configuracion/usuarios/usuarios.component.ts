import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AdministradorService } from '../../../../services/administrador.service'
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios:any=[]
  constructor(
    private _router: Router,
    private administradorService: AdministradorService,
    private fb: FormBuilder
  ) {
    this.dataForm = this.fb.group({
      nombre: [''],
      usuario: [''],
      contrasena: ['']
    });
  }

  dataForm = this.fb.group({
    nombre: [''],
    usuario: [''],
    contrasena: ['']
  });
  formData: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    usuario: new FormControl(''),
    contrasena: new FormControl('')

  });

  ngOnInit(): void {
    this.getAdministradores()
  }

  getAdministradores(){
    this.administradorService.getAdministradores()
    .subscribe((res)=>{
      console.log(res)
      this.usuarios=res
    },
    (error)=>{
      console.error(error)
    })
  }

  permiso_eq: number = 0
  permiso_ex: number = 0
  permiso_us: number = 0

  fieldsChange(values: any): void {


    console.log(values.currentTarget.checked);
    console.log(values.currentTarget.value);

    if (values.currentTarget.value == 'usuarios') {
      this.permiso_us = Number(values.currentTarget.checked)
    } else if (values.currentTarget.value == 'equivalencias') {
      this.permiso_eq = Number(values.currentTarget.checked)
    } else if (values.currentTarget.value == 'expedientes') {
      this.permiso_ex = Number(values.currentTarget.checked)
    }


    console.log(this.permiso_ex)
    console.log(this.permiso_eq)
    console.log(this.permiso_us)

  }

  createAdministrador() {
    const data = this.dataForm.value;

    let usuario = {
      api: "create",
      nombre_completo: data.nombre,
      user: data.usuario,
      password: data.contrasena,
      permiso_usuarios: this.permiso_us,
      permiso_equivalencias: this.permiso_eq,
      permiso_expedientes: this.permiso_ex
    }

    console.log(usuario)


    this.administradorService.createAdministrador(usuario)
      .subscribe((res) => {
        console.log(res)
        alert('usuario creado correctamente')
      },
        (error) => {
          console.error(error)
        })
  }

  guardar() {
    const data = this.dataForm.value;
    console.log(data)
    this.createAdministrador()
  }

  regresar() {
    this._router.navigate(['dashboard'])
  }

  goCentros() {
    this._router.navigate(['configuracion-centros'])
  }

}
