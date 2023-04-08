import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seleccion-cursos',
  templateUrl: './seleccion-cursos.component.html',
  styleUrls: ['./seleccion-cursos.component.css']
})
export class SeleccionCursosComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }


  regresar() {
    this._router.navigate(['proceso-nuevo'])
  }

  finalizar() {
    this._router.navigate(['inicio'])
  }

  currentInput: any;
  fileName: any;
  onFileSelected(event: any) {
    // console.log(event.target.files);
    this.currentInput = event.target.files;
    this.fileName=this.currentInput[0].name
    console.log(this.fileName)
  }
}
