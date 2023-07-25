import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import {throwError, catchError, observable, Observable} from 'rxjs'
import {environment} from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*'
    })
  };

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

  getSolicitudes() : Observable<any>{
    let url = `${environment.basePath}solicitud.php`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getSolicitud(id:any) : Observable<any>{
    let url = `${environment.basePath}solicitud.php?id_solicitud=${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getCarreraExtensionUnidad(id_carrera:any):Observable<any>{
    let url = `${environment.basePath}index.php?id_carrera=${id_carrera}`
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  reporte(data:any):Observable<any>{
    let url = `${environment.basePath}reporte.php`;
    return this.http.post(url, data)
    .pipe(
      catchError(this.handleError)
    )
  }


}
