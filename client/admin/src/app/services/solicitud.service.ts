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

  getCountSolicitudes(): Observable<any>{
    let url = `${environment.basePath}solicitud.php?conteo_solicitudes=1`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getSolicitudesFinalizadas(finalizadas:any): Observable<any>{
    let url = `${environment.basePath}solicitud.php?finalizadas=${finalizadas}`;
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

  getAllPrevios():Observable<any>{
    let url = `${environment.basePath}previo.php`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getPrevios(id_solicitud:any):Observable<any>{
    let url = `${environment.basePath}previo.php?id_solicitud=${id_solicitud}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  createPrevio(data:any):Observable<any>{
    let url = `${environment.basePath}previo.php`;
    return this.http.post(url, data)
    .pipe(
      catchError(this.handleError)
    )
  }

  createDetallePrevio(data:any):Observable<any>{
    let url = `${environment.basePath}previo.php?detalle_previo=1`;
    return this.http.post(url, data)
    .pipe(
      catchError(this.handleError)
    )
  }

  deletePrevio(id_previo:any):Observable<any>{
    let url = `${environment.basePath}previo.php?id_previo=${id_previo}`;
    return this.http.delete(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  deleteDetallePrevio(id_detalle_previo:any):Observable<any>{
    let url = `${environment.basePath}previo.php?id_detalle_previo=${id_detalle_previo}`;
    return this.http.delete(url)
    .pipe(
      catchError(this.handleError)
    )
  }


}
