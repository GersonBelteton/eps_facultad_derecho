import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/estudiante/inicio/inicio.component';
import { ProcesoNuevoComponent } from './components/estudiante/proceso-nuevo/proceso-nuevo.component';
import { SeleccionCursosComponent } from './components/estudiante/seleccion-cursos/seleccion-cursos.component';
import { RevisarProcesoActivoComponent } from './components/estudiante/revisar-proceso-activo/revisar-proceso-activo.component';
import { RevisarProcesoTerminadoComponent } from './components/estudiante/revisar-proceso-terminado/revisar-proceso-terminado.component';
import { EstadoProcesoComponent } from './components/estudiante/estado-proceso/estado-proceso.component';
import { FormsModule } from '@angular/forms';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaComponent } from './components/recaptcha/recaptcha.component';
import { environment } from '../environments/environment';
import {  ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    LoginComponent,
    InicioComponent,
    ProcesoNuevoComponent,
    SeleccionCursosComponent,
    RevisarProcesoActivoComponent,
    RevisarProcesoTerminadoComponent,
    EstadoProcesoComponent,
    RecaptchaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ReactiveFormsModule

  ],
  providers: [  {
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: environment.recaptcha.siteKey,
    } as RecaptchaSettings,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
