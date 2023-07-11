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

  usuarios: any = []
  isCheckedEx: boolean = false
  isCheckedEq: boolean = false
  isCheckedUs: boolean = false

  updateModal: boolean = false
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



  administrador: any
  openUpdateModal(id: any) {
    this.updateModal = true
    this.administradorService.getAdministrador(id)
      .subscribe((res) => {
        console.log(res)
        this.administrador = res[0]

        this.dataForm.patchValue(

          {
            nombre: this.administrador.nombre_completo,
            usuario: this.administrador.usuario,
            contrasena: this.administrador.contrasena
          }
        )

        if (this.administrador.permiso_usuarios == 1) {
          this.permiso_us = Number(this.isCheckedUs = true)
        }
        if (this.administrador.permiso_equivalencias == 1) {
          this.permiso_eq = Number(this.isCheckedEq = true)
        }
        if (this.administrador.permiso_expedientes == 1) {
          this.permiso_ex = Number(this.isCheckedEx = true)
        }

      },
        (error) => {
          console.error(error)
        })

  }

  fieldsChange(values: any): void {


    console.log(values)
    console.log(values.currentTarget.checked);
    console.log(values.currentTarget.value);

    if (values.currentTarget.value == 'usuarios') {
      this.permiso_us = Number(values.currentTarget.checked)
      this.isCheckedUs = true
    } else if (values.currentTarget.value == 'equivalencias') {
      this.permiso_eq = Number(values.currentTarget.checked)
      this.isCheckedEq = true
    } else if (values.currentTarget.value == 'expedientes') {
      this.permiso_ex = Number(values.currentTarget.checked)
      this.isCheckedEx = true
    }

    // values.currentTarget.checked = false
    console.log(this.permiso_ex)
    console.log(this.permiso_eq)
    console.log(this.permiso_us)

  }


  closeModal() {
    console.log("cerrando modal")

    if (this.updateModal) {
      this.updateModal = false
    }

    this.dataForm.patchValue(

      {
        nombre: '',
        usuario: '',
        contrasena: ''
      }
    )

    this.permiso_us = Number(this.isCheckedUs = false)
    this.permiso_eq = Number(this.isCheckedEq = false)
    this.permiso_ex = Number(this.isCheckedEx = false)

    // this.fieldsChange({currentTarget:{
    //   value:'usuarios',
    //   checked:false
    // }})

  }
  guardar() {
    const data = this.dataForm.value;
    console.log(data)

    if (this.updateModal) {
      this.updateAdministrador()
    } else {
      this.createAdministrador()
    }



  }



  regresar() {
    this._router.navigate(['dashboard'])
  }

  goCentros() {
    this._router.navigate(['configuracion-centros'])
  }


  getAdministradores() {
    this.administradorService.getAdministradores()
      .subscribe((res) => {
        console.log(res)
        this.usuarios = res
      },
        (error) => {
          console.error(error)
        })
  }


  updateAdministrador() {
    const data = this.dataForm.value;

    let usuario = {
      idAdmin: this.administrador.id,
      nombre_completo: data.nombre,
      user: data.usuario,
      password: data.contrasena,
      permiso_usuarios: this.permiso_us,
      permiso_equivalencias: this.permiso_eq,
      permiso_expedientes: this.permiso_ex
    }

    console.log(usuario)


    this.administradorService.updateAdministrador(usuario)
      .subscribe((res) => {
        console.log(res)
        alert('usuario actualizado correctamente')
        this.getAdministradores()
      },
        (error) => {
          console.error(error)
        })
  }


  deleteAdministrador(id: any) {
    this.administradorService.deleteAdministrador(id)
      .subscribe((res) => {
        console.log(res)
        this.getAdministradores()
      },
        (error) => {
          console.error(error)
        })
  }

  permiso_eq: number = 0
  permiso_ex: number = 0
  permiso_us: number = 0



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
        this.getAdministradores()
      },
        (error) => {
          console.error(error)
        })
  }

}
