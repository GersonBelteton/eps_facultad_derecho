import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getEstudiante()
  }


  getEstudiante(){
    this.estudiante.nombre=localStorage.getItem("nombre_est")
    this.estudiante.registro_academico=localStorage.getItem("registro_est")
    this.estudiante.unidad_academica=localStorage.getItem("ua_est")
    this.estudiante.extension=localStorage.getItem("ext_est")
    this.estudiante.carrera=localStorage.getItem("carrera_est")
  }

  estudiante : any = {
    nombre:"",
    registro_academico:"",
    unidad_academica:"",
    extension:"",
    carrera:""
  }


}
