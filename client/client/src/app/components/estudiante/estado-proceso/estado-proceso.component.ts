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
  previos:any = []
  estado: any
  id_solicitud:any
  mostrarCuadroPrevios:boolean = false
  constructor(
    private solicitudService: SolicitudService

  ) { }

  ngOnInit(): void {
    this.id_solicitud = localStorage.getItem("id_sol")
    this.getSolicitud()
    this.getPrevios()
  }



  getPrevios(){
    this.solicitudService.getPrevios(this.id_solicitud)
    .subscribe((res)=>{
      console.log(res)
      this.previos = res
      if(this.previos.length > 0){
        this.mostrarCuadroPrevios = true
      }
    },(error)=>{
      console.error(error)
    })
  }
  getSolicitud() {

    
    this.solicitudService.getSolicitud(this.id_solicitud)
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
