import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component'
import {InicioComponent} from './components/estudiante/inicio/inicio.component'
import {ProcesoNuevoComponent} from './components/estudiante/proceso-nuevo/proceso-nuevo.component'
import {SeleccionCursosComponent} from './components/estudiante/seleccion-cursos/seleccion-cursos.component'
import {RevisarProcesoActivoComponent} from './components/estudiante/revisar-proceso-activo/revisar-proceso-activo.component'
import {RevisarProcesoTerminadoComponent} from './components/estudiante/revisar-proceso-terminado/revisar-proceso-terminado.component'
import {QrRevisarProcesoComponent} from './components/estudiante/qr-revisar-proceso/qr-revisar-proceso.component'
import {AuthGuard} from './guards/auth/auth.guard'
import {HomeGuard} from './guards/auth/home.guard'
import {NewProcessGuard} from './guards/select/newprocess.guard'
import {SelectGuard} from './guards/select/select.guard'
import {NewProcessGuard2} from './guards/newProcess/newprocess.guard'
const routes: Routes = [

  {
    path:'',
    component:LoginComponent,
    canActivate: [HomeGuard]

  },
  {
    path:'inicio',
    component:InicioComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'proceso-nuevo',
    component: ProcesoNuevoComponent,
    canActivate: [AuthGuard, NewProcessGuard, NewProcessGuard2]
  },
  {
    path: 'seleccion-cursos',
    component: SeleccionCursosComponent,
    canActivate: [AuthGuard, SelectGuard, NewProcessGuard2]
  },
  {
    path: 'revisar-activo',
    component: RevisarProcesoActivoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'revisar-terminado',
    component: RevisarProcesoTerminadoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'qr-revisar-activo',
    component: QrRevisarProcesoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
