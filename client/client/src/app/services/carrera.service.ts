import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import {throwError, catchError, observable, Observable} from 'rxjs'
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

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


  getUnidadesAcademicas():Observable<any>{
    let url = `${environment.basePath}unidad_academica.php`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  gerCarreras(id_unidad:any):Observable<any>{
    let url = `${environment.basePath}carrera.php?id_unidad=${id_unidad}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }
}
