import { Component, OnInit, Input } from '@angular/core';
import { SolicitudService } from '../../../services/solicitud.service'
@Component({
  selector: 'app-estado-proceso',
  templateUrl: './estado-proceso.component.html',
  styleUrls: ['./estado-proceso.component.css']
})
export class EstadoProcesoComponent implements OnInit {
  @Input() id_sol: any;

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
    console.log(this.id_sol)
    //this.id_solicitud = localStorage.getItem("id_sol")
    this.id_solicitud = this.id_sol
    this.getSolicitud()
    
  }



  getPrevios(){
    this.solicitudService.getPrevios(this.id_solicitud)
    .subscribe((res)=>{
      console.log(res)
      this.previos = res
      if(this.previos.length > 0){
        if(this.estado == "DPP")
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

        this.getPrevios()
      },
        (error) => {
          console.log(error)
        })
  }


  estadoES: any
  estadoEA: any
  estadoVI: any
  estadoIF: any
  estadoDPP:any
  setEstados() {
    if (this.estado == "ES") {
      this.estadoES=true
      this.estadoEA=false
      this.estadoVI=false
      this.estadoIF=false
      this.estadoDPP=false
    }else if(this.estado == "EA"){
      this.estadoES=true
      this.estadoEA=true
      this.estadoVI=false
      this.estadoIF=false
      this.estadoDPP=false
    }else if(this.estado == "VIA"){
      this.estadoES=true
      this.estadoEA=true
      this.estadoVI=true
      this.estadoIF=false
      this.estadoDPP=false
      this.estadoDPP=false
    }
    else if(this.estado == "VIN"){
      this.estadoES=true
      this.estadoEA=true
      this.estadoVI=true
      this.estadoIF=false
      this.estadoDPP=false
      this.estadoDPP=false
    }
    else if(this.estado == "IF"){
      this.estadoES=true
      this.estadoEA=true
      this.estadoVI=true
      this.estadoIF=true
      this.estadoDPP=false

    }
    else if(this.estado == "GR"){
      this.estadoES=true
      this.estadoEA=true
      this.estadoVI=true
      this.estadoIF=true
      this.estadoDPP=false

    }
    else if(this.estado == "TJD"){
      this.estadoES=true
      this.estadoEA=true
      this.estadoVI=true
      this.estadoIF=true
      this.estadoDPP=false

    }else if(this.estado == "DPP"){
      this.estadoES=true
      this.estadoEA=true
      this.estadoVI=true
      this.estadoIF=false
      this.estadoDPP=true
    }
  }



}
