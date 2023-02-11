import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  regresar(){
    this._router.navigate(['configuracion-centros'])
  }

  goUsuarios(){
    this._router.navigate(['configuracion-usuario'])
  }

}
