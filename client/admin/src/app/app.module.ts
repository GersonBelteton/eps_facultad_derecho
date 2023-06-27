import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { InicioComponent } from './components/administrador/inicio/inicio.component';
import { ProcesoActivoComponent } from './components/administrador/proceso-activo/proceso-activo.component';
import { UsuariosComponent } from './components/administrador/configuracion/usuarios/usuarios.component';
import { CentrosComponent } from './components/administrador/configuracion/centros/centros.component';
import { CarrerasComponent } from './components/administrador/configuracion/carreras/carreras.component';
import { DashboardComponent } from './components/administrador/dashboard/dashboard.component';
import { ListaProcesosNuevosComponent } from './components/administrador/lista-procesos-nuevos/lista-procesos-nuevos.component';
import { ListaProcesosActivosComponent } from './components/administrador/lista-procesos-activos/lista-procesos-activos.component';
import { ListaProcesosTerminadosComponent } from './components/administrador/lista-procesos-terminados/lista-procesos-terminados.component';
import { ProcesoTerminadoComponent } from './components/administrador/proceso-terminado/proceso-terminado.component';
import { AsignaturasComponent } from './components/administrador/configuracion/asignaturas/asignaturas.component';
import { EquivalenciasComponent } from './components/administrador/configuracion/equivalencias/equivalencias.component';
import { FormsModule } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavegacionComponent,
    InicioComponent,
    ProcesoActivoComponent,
    UsuariosComponent,
    CentrosComponent,
    CarrerasComponent,
    DashboardComponent,
    ListaProcesosNuevosComponent,
    ListaProcesosActivosComponent,
    ListaProcesosTerminadosComponent,
    ProcesoTerminadoComponent,
    AsignaturasComponent,
    EquivalenciasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
