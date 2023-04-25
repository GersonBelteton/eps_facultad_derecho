import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import { Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map} from "rxjs/operators"
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

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

  getTokenClientModule(data: any) : Observable<any> {
    let url = `${environment.basePath}recaptcha.php`

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http.post(url, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  // getTokenClientModule(token: string): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //     })
  //   };
  //     return this.http.post<any>( `${environment.basePath}recaptcha.php?token=${token}`, httpOptions)
  //       .pipe(
  //         map((response) => response),
  //         catchError((err) => {
  //           console.log('error caught in service')
  //           console.error(err);
  //           return throwError(err);
  //         })
  //       );
  // }
}
