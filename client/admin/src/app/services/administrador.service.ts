import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import {throwError, catchError, observable, Observable} from 'rxjs'
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Un error ha ocurrido:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: `, error.error);
    }
    return throwError(
      error);
  };

  auth(data:any):Observable<any>{
    let url = `${environment.basePath}administrador.php`;
    return this.http.post(url, data)
    .pipe(
      catchError(this.handleError)
    )
  }

  createAdministrador(data:any):Observable<any>{
    let url = `${environment.basePath}administrador.php`;
    return this.http.post(url, data)
    .pipe(
      catchError(this.handleError)
    )
  }

  updateAdministrador(data:any):Observable<any>{
    let url = `${environment.basePath}administrador.php`;
    return this.http.put(url, data)
    .pipe(
      catchError(this.handleError)
    )
  }

  getAdministrador(id:any):Observable<any>{
    let url = `${environment.basePath}administrador.php?id_admin=${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getAdministradores():Observable<any>{
    let url = `${environment.basePath}administrador.php`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  
  deleteAdministrador(id:any):Observable<any>{
    let url = `${environment.basePath}administrador.php?id_admin=${id}`;
    return this.http.delete(url)
    .pipe(
      catchError(this.handleError)
    )
  }
}
