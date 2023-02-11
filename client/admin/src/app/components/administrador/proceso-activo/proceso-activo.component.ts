import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-proceso-activo',
  templateUrl: './proceso-activo.component.html',
  styleUrls: ['./proceso-activo.component.css']
})
export class ProcesoActivoComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }


  regresar(){
    this._router.navigate(['inicio'])
  }
}
