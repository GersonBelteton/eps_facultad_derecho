import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import {throwError, catchError, observable, Observable} from 'rxjs'
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

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
    let url = `${environment.basePath}wsrye.php`;
    return this.http.post(url, data)
    .pipe(
      catchError(this.handleError)
    )
  }

  getEstudiante(registro_academico:any):Observable<any>{
    let url = `${environment.basePath}estudiante.php?registro_academico=${registro_academico}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }


}
