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

  getAllUnidadesAcademicas():Observable<any>{
    let url = `${environment.basePath}unidad_academica.php`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getUnidadesAcademicas(origen:any):Observable<any>{
    let url = `${environment.basePath}unidad_academica.php?origen=${origen}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getExtensionesUniversitarias(id_unidad:any):Observable<any>{
    let url = `${environment.basePath}extension_universitaria.php?unidad_academica=${id_unidad}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  gerCarreras(id_extension:any):Observable<any>{
    let url = `${environment.basePath}carrera.php?id_extension=${id_extension}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getAsignaturas(id_carrera:any):Observable<any>{
    let url = `${environment.basePath}asignatura.php?id_carrera=${id_carrera}`
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getEquivalencias(id_asignatura:any, id_carrera:any):Observable<any>{
    let url = `${environment.basePath}equivalencia.php?id_asignatura=${id_asignatura}&id_carrera=${id_carrera}`
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getUnidadAcademica(unidad_academica:any):Observable<any>{
    let url = `${environment.basePath}unidad_academica.php?unidad_academica=${unidad_academica}`
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getExtensionUniversitaria(extension_universitaria:any, unidad_academica:any):Observable<any>{
    let url = `${environment.basePath}extension_universitaria.php?extension=${extension_universitaria}&unidad_academica=${unidad_academica}`
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getCarrera(unidad_academica:any, extension:any, carrera:any):Observable<any>{
    let url = `${environment.basePath}carrera.php?codigo_carrera=${carrera}&unidad_academica=${unidad_academica}&extension=${extension}`
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


}
