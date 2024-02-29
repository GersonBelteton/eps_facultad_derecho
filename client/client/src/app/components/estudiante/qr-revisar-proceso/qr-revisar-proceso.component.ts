import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from '../../../services/solicitud.service'
import { CarreraService } from '../../../services/carrera.service';


@Component({
  selector: 'app-qr-revisar-proceso',
  templateUrl: './qr-revisar-proceso.component.html',
  styleUrls: ['./qr-revisar-proceso.component.css']
})
export class QrRevisarProcesoComponent {

  solicitud: any
  carreraActual: any
  carreraDestino: any
  urlTree: any
  id_sol:any
  constructor(
    private _router: Router,
    private solicitudService: SolicitudService,
    private carreraService: CarreraService
  ) {

    this.urlTree = this._router.parseUrl(this._router.url)
    this.id_sol = this.urlTree.queryParams['id_sol'];
    
  }

  ngOnInit(): void {
    this.getSolicitud()
  }


  getSolicitud() {

    //var id_solicitud = localStorage.getItem("id_sol")
    console.log(this.id_sol)
    this.solicitudService.getSolicitud(this.id_sol)
      .subscribe((res) => {
        console.log(res)
        this.solicitud = res
        this.getCarreraActual()
        this.getCarreraDestino()
      },
        (error) => {
          console.log(error)
        })
  }


  getCarreraActual() {

    var id_carrera = this.solicitud.asignaturas[0].codigo_carrera
    this.carreraService.getCarreraExtensionUnidad(id_carrera)
      .subscribe((res) => {
        console.log(res)
        this.carreraActual = res[0]
      },
        (error) => {
          console.error(error)
        })

  }

  getCarreraDestino() {

    var id_carrera = this.solicitud.solicitud[0].codigo_carrera
    this.carreraService.getCarreraExtensionUnidad(id_carrera)
      .subscribe((res) => {
        console.log(res)
        this.carreraDestino = res[0]
      },
        (error) => {
          console.error(error)
        })

  }
  regresar() {
    this._router.navigate(['inicio'])
  }


}