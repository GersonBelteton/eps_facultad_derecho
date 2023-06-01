import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NewProcessGuard implements CanActivate {
  constructor(private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(localStorage.getItem('id_carrera_destino')){
      localStorage.removeItem('id_carrera_destino')
      this.router.navigate(['proceso-nuevo'])
    }

    if(!localStorage.getItem('id_carrera_destino')){
      return true;
    }
    return false;
  }
  
}