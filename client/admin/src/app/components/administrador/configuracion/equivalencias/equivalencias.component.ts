import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-equivalencias',
  templateUrl: './equivalencias.component.html',
  styleUrls: ['./equivalencias.component.css']
})
export class EquivalenciasComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  regresar(){
    this._router.navigate(['configuracion-asignaturas'])
  }

  goUsuarios(){
    this._router.navigate(['configuracion-usuario'])
  }
}
