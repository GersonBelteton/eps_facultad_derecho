import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-lista-procesos-nuevos',
  templateUrl: './lista-procesos-nuevos.component.html',
  styleUrls: ['./lista-procesos-nuevos.component.css']
})
export class ListaProcesosNuevosComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  goVer(){
    this._router.navigate(['proceso-activo'])
  }
}
