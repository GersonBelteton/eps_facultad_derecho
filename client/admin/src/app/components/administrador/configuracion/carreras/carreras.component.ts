import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {

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
