import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SolicitudService} from '../../../services/solicitud.service'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  solicitudes:any=[]

  constructor(
    private solicitudService: SolicitudService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this.getSolicitudes()
  }

  goProcesoNuevo(){
    this._router.navigate(['proceso-nuevo'])
  }

  goRevisarActivo(){
    this._router.navigate(['revisar-activo'])
  }

  goRevisarTerminado(){
    this._router.navigate(['revisar-terminado'])
  }

  getSolicitudes(){
    this.solicitudService.getSolicitudes('201805977')
    .subscribe(
      (res)=>{
        this.solicitudes = res
        console.log(this.solicitudes)
      },
      (error)=>{
        console.log(error)
      }
    )
  }

}
