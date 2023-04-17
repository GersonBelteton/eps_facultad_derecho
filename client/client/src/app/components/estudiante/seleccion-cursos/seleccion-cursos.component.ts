import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CarreraService} from '../../../services/carrera.service'
@Component({
  selector: 'app-seleccion-cursos',
  templateUrl: './seleccion-cursos.component.html',
  styleUrls: ['./seleccion-cursos.component.css']
})
export class SeleccionCursosComponent implements OnInit {


  asignaturas:any =[]
  equivalencias:any=[]
  constructor(
    private _router: Router,
    private carreraService: CarreraService
    ) { }

  ngOnInit(): void {
    this.getAsignaturas();
  }


  regresar() {
    this._router.navigate(['proceso-nuevo'])
  }

  finalizar() {
    this._router.navigate(['inicio'])
  }


  getAsignaturas(){
    this.carreraService.getAsignaturas(9)
    .subscribe(
      (res)=>{
        this.asignaturas = res
      },
      (error)=>{
        console.error(error)
      }
    )
  }

  getEquivalencias(){

    this.asignaturas.forEach((asignatura: { codigo: any; }) => {
      
      this.carreraService.getEquivalencias(asignatura.codigo,localStorage.getItem("id_carrera_destino"))
      .subscribe(
        (res)=>{
          this.equivalencias.push(res)
        },
        (error)=>{
          console.error(error)
        }
      )
    });

    console.log(this.equivalencias)

  }

  currentInput: any;
  fileName: any;
  onFileSelected(event: any) {
    // console.log(event.target.files);
    this.currentInput = event.target.files;
    this.fileName=this.currentInput[0].name
    console.log(this.fileName)
  }
}
