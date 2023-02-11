import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component'
import {InicioComponent} from './components/estudiante/inicio/inicio.component'
import {ProcesoNuevoComponent} from './components/estudiante/proceso-nuevo/proceso-nuevo.component'
import {SeleccionCursosComponent} from './components/estudiante/seleccion-cursos/seleccion-cursos.component'
import {RevisarProcesoActivoComponent} from './components/estudiante/revisar-proceso-activo/revisar-proceso-activo.component'
import {RevisarProcesoTerminadoComponent} from './components/estudiante/revisar-proceso-terminado/revisar-proceso-terminado.component'
const routes: Routes = [

  {
    path:'',
    component:LoginComponent

  },
  {
    path:'inicio',
    component:InicioComponent
  },
  {
    path:'proceso-nuevo',
    component: ProcesoNuevoComponent
  },
  {
    path: 'seleccion-cursos',
    component: SeleccionCursosComponent
  },
  {
    path: 'revisar-activo',
    component: RevisarProcesoActivoComponent
  },
  {
    path: 'revisar-terminado',
    component: RevisarProcesoTerminadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
