import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from '../../../services/solicitud.service'
import { EquivalenciaService } from '../../../services/equivalencia.service'
@Component({
  selector: 'app-proceso-activo',
  templateUrl: './proceso-activo.component.html',
  styleUrls: ['./proceso-activo.component.css']
})
export class ProcesoActivoComponent implements OnInit {

  solicitud: any
  idSolicitud: any
  carreraActual: any
  carreraDestino: any
  equivalencias: any = []
  urlReporte:any

  constructor(private _router: Router,
    private solicitudService: SolicitudService,
    private equivalenciaService: EquivalenciaService) { }

  ngOnInit(): void {
    this.idSolicitud = localStorage.getItem('sol-id')
    this.urlReporte =`http://localhost/ws/reporte.php?id_solicitud=${this.idSolicitud}`
    this.getSolicitud()

  }

  getEquivalencias() {

    this.solicitud.asignaturas.forEach((asignatura: { id: any; }) => {

      this.equivalenciaService.getEquivalentes(asignatura.id, this.solicitud.solicitud[0].codigo_carrera)
        .subscribe(
          (res) => {
            console.log(res)

            let asignaturas = res

            asignaturas.forEach((asignatura: any) => {
              let asig = {
                codigo_asignatura: asignatura.codigo_asignatura,
                nombre: asignatura.nombre
              }
              let inList = false

              this.equivalencias.forEach((eq: any) => {
                if (eq.codigo_asignatura == asig.codigo_asignatura) {
                  inList = true
                  return;
                }
              });
              if (!inList) {
                this.equivalencias.push(asig)
              }

            });
            //this.equivalencias.push(res)

            console.log(this.equivalencias)
          },
          (error) => {
            console.error(error)
          }
        )
    });



  }




  getCarreraActual() {

    var id_carrera = this.solicitud.asignaturas[0].codigo_carrera
    this.solicitudService.getCarreraExtensionUnidad(id_carrera)
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
    this.solicitudService.getCarreraExtensionUnidad(id_carrera)
      .subscribe((res) => {
        console.log(res)
        this.carreraDestino = res[0]
      },
        (error) => {
          console.error(error)
        })

  }

  getSolicitud() {

    this.solicitudService.getSolicitud(this.idSolicitud)
      .subscribe((res) => {
        this.solicitud = res
        console.log(this.solicitud)
        this.getCarreraActual()
        this.getCarreraDestino()
        this.getEquivalencias()
      },
        (error) => {
          console.error(error)
        })
  }

  regresar() {
    this._router.navigate(['inicio'])
  }
}
