import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    EstadoProcesoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
