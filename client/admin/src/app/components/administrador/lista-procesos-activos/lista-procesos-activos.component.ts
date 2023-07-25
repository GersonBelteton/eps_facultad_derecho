import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {SolicitudService} from '../../../services/solicitud.service'
@Component({
  selector: 'app-lista-procesos-activos',
  templateUrl: './lista-procesos-activos.component.html',
  styleUrls: ['./lista-procesos-activos.component.css']
})
export class ListaProcesosActivosComponent implements OnInit {


  solicitudes : any = []


  constructor(
    private _router:Router,
    private solicitudService:SolicitudService) { }

  ngOnInit(): void {
    this.getSolicitudes()
  }

  getSolicitudes(){
    this.solicitudService.getSolicitudes()
    .subscribe((res)=>{
      this.solicitudes = res
      console.log(this.solicitudes)
    },
    (error)=>{
      console.error(error)
    })
  }

  goVer(id:any){
    localStorage.setItem('sol-id',id)
    this._router.navigate(['proceso-activo'])
  }

}
