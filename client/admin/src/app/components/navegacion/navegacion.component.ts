import { Component, OnInit } from '@angular/core';
import {AdministradorService} from '../../services/administrador.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  admin:any
  idAdmin:any
  constructor(
    //private _router:Router,
    private administradorServie:AdministradorService
  ) { }

  ngOnInit(): void {
    this.idAdmin = localStorage.getItem("current_id")
    this.getAdministrador()
  }

  logOut(){
    localStorage.removeItem("current_id")
  }
  
  getAdministrador(){

    this.administradorServie.getAdministrador(this.idAdmin)
    .subscribe(
      (res)=>{
        console.log(res)
        this.admin = res[0]
      },
      (error)=>{
        console.error(error)
      }
    )
  }

}
