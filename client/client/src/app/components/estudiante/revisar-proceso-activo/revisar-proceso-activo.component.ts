import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-revisar-proceso-activo',
  templateUrl: './revisar-proceso-activo.component.html',
  styleUrls: ['./revisar-proceso-activo.component.css']
})
export class RevisarProcesoActivoComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  regresar(){
    this._router.navigate(['inicio'])
  }
}
