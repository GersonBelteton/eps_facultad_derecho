import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  regresar(){
    this._router.navigate(['dashboard'])
  }

  goCentros(){
    this._router.navigate(['configuracion-centros'])
  }

}
