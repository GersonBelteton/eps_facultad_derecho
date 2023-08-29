import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import {throwError, catchError, observable, Observable} from 'rxjs'
import {environment} from 'src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class EquivalenciaService {

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

  getUnidad(id:any) : Observable<any>{
    let url = `${environment.basePath}unidad_academica.php?id=${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getUnidades() : Observable<any>{
    let url = `${environment.basePath}unidad_academica.php`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  createUnidad(data:any) : Observable<any>{
    let url = `${environment.basePath}unidad_academica.php`;
    return this.http.post(url,data)
    .pipe(
      catchError(this.handleError)
    )
  }

  updateUnidad(data:any) : Observable<any>{
    let url = `${environment.basePath}unidad_academica.php`;
    return this.http.put(url,data)
    .pipe(
      catchError(this.handleError)
    )
  }

  deleteUnidad(id:any):Observable<any>{
    let url = `${environment.basePath}unidad_academica.php?id_unidad=${id}`;
    return this.http.delete(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getExtension(id:any) : Observable<any>{
    let url = `${environment.basePath}extension_universitaria.php?id_extension=${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getExtensiones(id:any) : Observable<any>{
    let url = `${environment.basePath}extension_universitaria.php?unidad_academica=${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  createExtension(data:any) : Observable<any>{
    let url = `${environment.basePath}extension_universitaria.php`;
    return this.http.post(url,data)
    .pipe(
      catchError(this.handleError)
    )
  }

  updateExtension(data:any) : Observable<any>{
    let url = `${environment.basePath}extension_universitaria.php`;
    return this.http.put(url,data)
    .pipe(
      catchError(this.handleError)
    )
  }

  deleteExtension(id:any):Observable<any>{
    let url = `${environment.basePath}extension_universitaria.php?id_extension=${id}`;
    return this.http.delete(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getCarrera(id:any) : Observable<any>{
    let url = `${environment.basePath}carrera.php?id_carrera=${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getCarreras(id:any) : Observable<any>{
    let url = `${environment.basePath}carrera.php?id_extension=${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  createCarrera(data:any) : Observable<any>{
    let url = `${environment.basePath}carrera.php`;
    return this.http.post(url,data)
    .pipe(
      catchError(this.handleError)
    )
  }

  updateCarrera(data:any) : Observable<any>{
    let url = `${environment.basePath}carrera.php`;
    return this.http.put(url,data)
    .pipe(
      catchError(this.handleError)
    )
  }

  deleteCarrera(id:any):Observable<any>{
    let url = `${environment.basePath}carrera.php?id_carrera=${id}`;
    return this.http.delete(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getAsignatura(id:any) : Observable<any>{
    let url = `${environment.basePath}asignatura.php?id_asignatura=${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getAsignaturas(id:any) : Observable<any>{
    let url = `${environment.basePath}asignatura.php?id_carrera=${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  createAsignatura(data:any) : Observable<any>{
    let url = `${environment.basePath}asignatura.php`;
    return this.http.post(url,data)
    .pipe(
      catchError(this.handleError)
    )
  }

  updateAsignatura(data:any) : Observable<any>{
    let url = `${environment.basePath}asignatura.php`;
    return this.http.put(url,data)
    .pipe(
      catchError(this.handleError)
    )
  }

  deleteAsignatura(id:any):Observable<any>{
    let url = `${environment.basePath}asignatura.php?id_asignatura=${id}`;
    return this.http.delete(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getEquivalentes(id_asignatura:any, id_carrera:any) : Observable<any>{
    let url = `${environment.basePath}equivalencia.php?id_asignatura=${id_asignatura}&id_carrera=${id_carrera}&equivalente=1`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  getNoEquivalentes(id_asignatura:any, id_carrera:any) : Observable<any>{
    let url = `${environment.basePath}equivalencia.php?id_asignatura=${id_asignatura}&id_carrera=${id_carrera}&equivalente=0`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    )
  }

  createEquivalencia(data:any) : Observable<any>{
    let url = `${environment.basePath}equivalencia.php`;
    return this.http.post(url,data)
    .pipe(
      catchError(this.handleError)
    )
  }

  deleteEquivalencia(id:any):Observable<any>{
    let url = `${environment.basePath}equivalencia.php?id_equivalencia=${id}`;
    return this.http.delete(url)
    .pipe(
      catchError(this.handleError)
    )
  }
}
