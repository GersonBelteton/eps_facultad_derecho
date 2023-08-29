import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AdministradorService} from '../../../services/administrador.service'
import {SolicitudService} from '../../../services/solicitud.service'
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  solicitudesFinalizadas: any
  solicitudesNoFinalizadas:any
  constructor(
    private _router:Router,
    private administradorService:AdministradorService,
    private solicitudService:SolicitudService

  ) { }

  ngOnInit(): void {
    this.conteoSolicitudes()
  }


  conteoSolicitudes(){
    this.solicitudService.getCountSolicitudes()
    .subscribe((res)=>{
      console.log(res)
      this.solicitudesFinalizadas = res[1].cantidad
      this.solicitudesNoFinalizadas = res[0].cantidad
    },(error)=>{
      console.error(error)
    })
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