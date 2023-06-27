import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AdministradorService} from '../../../services/administrador.service'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  constructor(
    private _router:Router,
    private administradorServie:AdministradorService

  ) { }

  ngOnInit(): void {

  }



  

  goListaProcesosNuevos(){
    this._router.navigate(['lista-procesos-nuevos'])
  }

  goListaProcesosActivos(){
    this._router.navigate(['lista-procesos-activos'])
  }

  goListaProcesosTerminados(){
    this._router.navigate(['lista-procesos-termiandos'])
  }

  goConfiguracion(){
    this._router.navigate(['configuracion-usuario'])
  }
}