import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-lista-procesos-activos',
  templateUrl: './lista-procesos-activos.component.html',
  styleUrls: ['./lista-procesos-activos.component.css']
})
export class ListaProcesosActivosComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  goVer(){
    this._router.navigate(['proceso-activo'])
  }

}
