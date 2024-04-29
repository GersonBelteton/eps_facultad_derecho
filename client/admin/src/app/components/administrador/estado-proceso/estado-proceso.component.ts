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
  previos: any = []
  estado: any
  id_solicitud: any
  mostrarCuadroPrevios: boolean = false


  constructor(
    private solicitudService: SolicitudService

  ) { }

  ngOnInit(): void {
    console.log(this.id_sol)
    //this.id_solicitud = localStorage.getItem("id_sol")
    this.id_solicitud = this.id_sol
    this.getSolicitud()
    this.getPrevios()
  }



  getPrevios() {
    this.solicitudService.getPrevios(this.id_solicitud)
      .subscribe((res) => {
        console.log(res)
        this.previos = res
        if (this.previos.length > 0) {
          this.mostrarCuadroPrevios = true
        }
      }, (error) => {
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


  estadoEA: any
  estadoVI: any
  estadoIF: any
  estadoGR: any
  estadoTJD: any
  estadoDPP: any
  setEstados() {
    if (this.estado == "EA") {
      this.estadoEA = true
      this.estadoVI = false
      this.estadoIF = false
      this.estadoGR = false
      this.estadoTJD = false
      this.estadoDPP = false
    } else if (this.estado == "VIN") {
      this.estadoEA = true
      this.estadoVI = true
      this.estadoIF = false
      this.estadoGR = false
      this.estadoTJD = false
      this.estadoDPP = false
    }else if (this.estado == "VIA") {
      this.estadoEA = true
      this.estadoVI = true
      this.estadoIF = false
      this.estadoGR = false
      this.estadoTJD = false
      this.estadoDPP = false
    } 
    else if (this.estado == "IF") {
      this.estadoEA = true
      this.estadoVI = true
      this.estadoIF = true
      this.estadoGR = false
      this.estadoTJD = false
      this.estadoDPP = false
    } else if (this.estado == "GR") {
      this.estadoEA = true
      this.estadoVI = true
      this.estadoIF = true
      this.estadoGR = true
      this.estadoTJD = false
      this.estadoDPP = false
    }
      else if (this.estado == "TJD") {
        this.estadoEA = true
        this.estadoVI = true
        this.estadoIF = true
        this.estadoGR = true
        this.estadoTJD = true
        this.estadoDPP = false
      } else if (this.estado == "DPP") {
        this.estadoEA = true
        this.estadoVI = true
        this.estadoIF = false
        this.estadoGR = false
        this.estadoTJD = false
        this.estadoDPP = true
      }
    }



  }

