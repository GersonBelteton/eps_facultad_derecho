import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.css']
})
export class CentrosComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  regresar(){
    this._router.navigate(['inicio'])
  }

  goUsuarios(){
    this._router.navigate(['configuracion-usuario'])
  }
}
