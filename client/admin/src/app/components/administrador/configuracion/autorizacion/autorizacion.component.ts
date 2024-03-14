import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { EquivalenciaService } from '../../../../services/equivalencia.service'
@Component({
  selector: 'app-autorizacion',
  templateUrl: './autorizacion.component.html',
  styleUrls: ['./autorizacion.component.css']
})
export class AutorizacionComponent implements OnInit {

  autorizaciones: any = []
  unidades: any = []
  unidad: any
  updateModal: boolean = false
  constructor(
    private _router: Router,
    private equivalenciaService: EquivalenciaService,
    private fb: FormBuilder
  ) {
    this.dataForm = this.fb.group({
      punto_a: [''],
      acta_a: [''],
      inciso_a: [''],
      año_a: [''],
      mes_a: [''],
      dia_a: [''],
      punto_ia: [''],
      acta_ia: [''],
      inciso_ia: [''],
      año_ia: [''],
      mes_ia: [''],
      dia_ia: [''],
      id_unidad: ['']
    });
  }

  dataForm = this.fb.group({
    punto_a: [''],
    acta_a: [''],
    inciso_a: [''],
    año_a: [''],
    mes_a: [''],
    dia_a: [''],
    fecha_a: [''],
    punto_ia: [''],
    acta_ia: [''],
    inciso_ia: [''],
    año_ia: [''],
    mes_ia: [''],
    dia_ia: [''],
    id_unidad: ['']
  });
  formData: FormGroup = new FormGroup({

    punto_a: new FormControl(''),
    acta_a: new FormControl(''),
    inciso_a: new FormControl(''),
    año_a: new FormControl(''),
    mes_a: new FormControl(''),
    dia_a: new FormControl(''),
    punto_ia: new FormControl(''),
    acta_ia: new FormControl(''),
    inciso_ia: new FormControl(''),
    año_ia: new FormControl(''),
    mes_ia: new FormControl(''),
    dia_ia: new FormControl(''),
    id_unidad: new FormControl('')

  });

  ngOnInit(): void {
    this.getAutorizaciones()
    this.getUnidades()
  }


  selectedUnidad = '';
  id_unidad: any
  onSelected(value: any): void {
    this.selectedUnidad = value;
    console.log(this.selectedUnidad)
    let array = this.selectedUnidad.split("-")
    this.id_unidad = array[0]

  }


  openUpdateModal(id: any) {
    this.updateModal = true

    this.equivalenciaService.getUnidad(id)
      .subscribe((res) => {
        console.log(res)
        this.unidad = res[0]

        this.dataForm.patchValue(

          {
            nombre: this.unidad.nombre,
            codigo: this.unidad.codigo,
          }
        )
      }, (error) => {
        console.error(error)
      })
  }

  openCreateModal() {
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

    if (this.updateModal) {
      this.updateUnidad()
    } else if (!this.updateModal) {
      this.createAutorizacion()
    }

  }

  goExtensiones(id: any) {
    localStorage.setItem('conf-ua', id)
    this._router.navigate(['configuracion-extensiones'])
  }

  updateUnidad() {
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


  getAutorizaciones() {
    this.equivalenciaService.getAutorizaciones()
      .subscribe((res) => {
        console.log(res)
        this.autorizaciones = res
      },
        (error) => {
          console.error(error)
        })
  }

  deleteAutorizacion(id_autorizacion: any) {
    this.equivalenciaService.deleteAutorizacion(id_autorizacion)
      .subscribe((res) => {
        alert("Se ha eliminado correctamente")
        this.getAutorizaciones()
      }, (error) => {
        console.error(error)
      }

      )
  }
  createAutorizacion() {
    const data = this.dataForm.value;

    let autorizacion = {

      punto_ia: data.punto_ia,
      acta_ia: data.acta_ia,
      inciso_ia: data.inciso_ia,
      fecha_ia: data.dia_ia + " " + data.mes_ia + " " + data.año_ia,
      punto_a: data.punto_a,
      acta_a: data.acta_a,
      inciso_a: data.inciso_a,
      fecha_a: data.dia_a + " " + data.mes_a + " " + data.año_a,
      id_unidad: this.id_unidad
    }

    this.equivalenciaService.createAutorizacion(autorizacion)
      .subscribe(
        (res) => {
          console.log(res)
          this.getAutorizaciones()
        },
        (error) => {
          console.error(error)
        }
      )
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
