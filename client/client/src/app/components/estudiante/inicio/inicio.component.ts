import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from '../../../services/solicitud.service'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  solicitudes: any = []
  registro_est: any
  hayProcesoActivo: any
  constructor(
    private solicitudService: SolicitudService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.registro_est = localStorage.getItem("registro_est")
    this.getSolicitudes()
    

  }

  goProcesoNuevo() {
    this._router.navigate(['proceso-nuevo'])
  }

  goRevisarActivo(id_solicitud: any) {

    localStorage.setItem("id_sol", id_solicitud)
    this._router.navigate(['revisar-activo'])
  }

  goRevisarTerminado() {
    this._router.navigate(['revisar-terminado'])
  }

  getSolicitudes() {

    this.solicitudService.getSolicitudes(this.registro_est)
      .subscribe(
        (res) => {
          this.solicitudes = res
          console.log(this.solicitudes)
          this.procesoActivo()
        },
        (error) => {
          console.log(error)
        }
      )
  }


  procesoActivo() {


    console.log(this.solicitudes)
    this.solicitudes.forEach((solicitud: any) => {

      console.log(solicitud.resultado)
      if (solicitud.resultado == null) {
        this.hayProcesoActivo = true
        localStorage.setItem("act_pr","true")
        return
      }else{
        this.hayProcesoActivo = false
      }
    });



  }

  mostrarAlerta:any
  alertaProcesoActivo(){

    this.mostrarAlerta = true

    setTimeout(() => {
      this.mostrarAlerta = false
    }, 5000);

    
  }

}
