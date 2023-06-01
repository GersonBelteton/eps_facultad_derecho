import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../../services/solicitud.service'
@Component({
  selector: 'app-estado-proceso',
  templateUrl: './estado-proceso.component.html',
  styleUrls: ['./estado-proceso.component.css']
})
export class EstadoProcesoComponent implements OnInit {

  activo: any = true;
  solicitud: any;

  estado: any
  constructor(
    private solicitudService: SolicitudService

  ) { }

  ngOnInit(): void {
    this.getSolicitud()
  }

  getSolicitud() {

    var id_solicitud = localStorage.getItem("id_sol")
    this.solicitudService.getSolicitud(id_solicitud)
      .subscribe((res) => {
        console.log(res)
        this.solicitud = res
        this.estado = this.solicitud.solicitud[0].estado
        this.setEstados()
      },
        (error) => {
          console.log(error)
        })
  }


  estadoPI: any
  estadoEA: any
  estadoER: any
  estadoPF: any
  estadoDPP:any
  setEstados() {
    if (this.estado == "PI") {
      this.estadoPI=true
      this.estadoEA=false
      this.estadoER=false
      this.estadoPF=false
      this.estadoDPP=false
    }else if(this.estado == "EA"){
      this.estadoPI=true
      this.estadoEA=true
      this.estadoER=false
      this.estadoPF=false
      this.estadoDPP=false
    }else if(this.estado == "ER"){
      this.estadoPI=true
      this.estadoEA=true
      this.estadoER=true
      this.estadoPF=false
      this.estadoDPP=false
    }else if(this.estado == "PF"){
      this.estadoPI=true
      this.estadoEA=true
      this.estadoER=true
      this.estadoPF=true
      this.estadoDPP=false
    }else if(this.estado == "DPP"){
      this.estadoPI=true
      this.estadoEA=true
      this.estadoER=true
      this.estadoPF=false
      this.estadoDPP=true
    }
  }



}
