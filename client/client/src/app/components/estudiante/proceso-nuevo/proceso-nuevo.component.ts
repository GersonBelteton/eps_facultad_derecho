import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-proceso-nuevo',
  templateUrl: './proceso-nuevo.component.html',
  styleUrls: ['./proceso-nuevo.component.css']
})
export class ProcesoNuevoComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  siguiente(){
    this._router.navigate(['seleccion-cursos'])
  }

  regresar(){
    this._router.navigate(['inicio'])
  }

}
