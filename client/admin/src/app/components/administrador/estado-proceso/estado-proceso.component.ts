import { Component, OnInit, Input } from '@angular/core';
import { SolicitudService } from '../../../services/solicitud.service'
@Component({
  selector: 'app-estado-proceso',
  templateUrl: './estado-proceso.component.html',
  styleUrls: ['./estado-proceso.component.css']
})
export class EstadoProcesoComponent implements OnInit {
  @Input() estado_: any;


  estado: any
  constructor() { }

  ngOnInit(): void {
    console.log(this.estado_)
    //this.id_solicitud = localStorage.getItem("id_sol")
    this.estado = this.estado_
    this.setEstados()
  }

  ngOnChanges(): void {
    this.setEstados();
  }




  estadoEA: any
  estadoVI: any
  estadoIF: any
  estadoGR: any
  estadoTJD: any
  estadoDPP: any
  setEstados() {
    if (this.estado_ == "EA") {
      this.estadoEA = true
      this.estadoVI = false
      this.estadoIF = false
      this.estadoGR = false
      this.estadoTJD = false
      this.estadoDPP = false
    } else if (this.estado_ == "VIN") {
      this.estadoEA = true
      this.estadoVI = true
      this.estadoIF = false
      this.estadoGR = false
      this.estadoTJD = false
      this.estadoDPP = false
    }else if (this.estado_ == "VIA") {
      this.estadoEA = true
      this.estadoVI = true
      this.estadoIF = false
      this.estadoGR = false
      this.estadoTJD = false
      this.estadoDPP = false
    } 
    else if (this.estado_ == "IF") {
      this.estadoEA = true
      this.estadoVI = true
      this.estadoIF = true
      this.estadoGR = false
      this.estadoTJD = false
      this.estadoDPP = false
    } else if (this.estado_ == "GR") {
      this.estadoEA = true
      this.estadoVI = true
      this.estadoIF = true
      this.estadoGR = true
      this.estadoTJD = false
      this.estadoDPP = false
    }
      else if (this.estado_ == "TJD") {
        this.estadoEA = true
        this.estadoVI = true
        this.estadoIF = true
        this.estadoGR = true
        this.estadoTJD = true
        this.estadoDPP = false
      } else if (this.estado_ == "DPP") {
        this.estadoEA = true
        this.estadoVI = true
        this.estadoIF = false
        this.estadoGR = false
        this.estadoTJD = false
        this.estadoDPP = true
      }
    }



  }

