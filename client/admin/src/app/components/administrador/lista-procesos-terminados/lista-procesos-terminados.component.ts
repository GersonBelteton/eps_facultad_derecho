import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-lista-procesos-terminados',
  templateUrl: './lista-procesos-terminados.component.html',
  styleUrls: ['./lista-procesos-terminados.component.css']
})
export class ListaProcesosTerminadosComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  goVer(){
    this._router.navigate(['proceso-terminado'])
  }
}
