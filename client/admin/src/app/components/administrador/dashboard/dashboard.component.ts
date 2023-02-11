import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _router:Router) { }

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
