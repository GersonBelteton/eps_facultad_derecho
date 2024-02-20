import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component'
import {InicioComponent} from './components/administrador/inicio/inicio.component'
import {ProcesoActivoComponent} from './components/administrador/proceso-activo/proceso-activo.component'
import {ProcesoTerminadoComponent} from './components/administrador/proceso-terminado/proceso-terminado.component'
import {UsuariosComponent} from './components/administrador/configuracion/usuarios/usuarios.component'
import {UnidadesComponent} from './components/administrador/configuracion/unidades/unidades.component'
import {ExtensionesComponent} from './components/administrador/configuracion/extensiones/extensiones.component'
import {CarrerasComponent} from './components/administrador/configuracion/carreras/carreras.component'
import {AsignaturasComponent} from './components/administrador/configuracion/asignaturas/asignaturas.component'
import {EquivalenciasComponent} from './components/administrador/configuracion/equivalencias/equivalencias.component'
import {DashboardComponent} from './components/administrador/dashboard/dashboard.component'
import {ListaProcesosNuevosComponent} from './components/administrador/lista-procesos-nuevos/lista-procesos-nuevos.component'
import {ListaProcesosActivosComponent} from './components/administrador/lista-procesos-activos/lista-procesos-activos.component'
import {ListaProcesosTerminadosComponent} from './components/administrador/lista-procesos-terminados/lista-procesos-terminados.component'
import {AutorizacionComponent} from './components/administrador/configuracion/autorizacion/autorizacion.component'
const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },
  {
    path:'inicio',
    component: InicioComponent
  },
  {
    path: 'proceso-activo',
    component: ProcesoActivoComponent
  },
  {
    path: 'proceso-terminado',
    component: ProcesoTerminadoComponent
  },
  {
    path: 'configuracion-usuario',
    component: UsuariosComponent
  },
  {
    path: 'configuracion-unidades',
    component: UnidadesComponent
  },
  {
    path: 'configuracion-extensiones',
    component: ExtensionesComponent
  },
  {
    path: 'configuracion-carreras',
    component: CarrerasComponent
  },
  {
    path: 'configuracion-asignaturas',
    component: AsignaturasComponent
  },
  {
    path: 'configuracion-equivalencias',
    component: EquivalenciasComponent
  },
  {
    path: 'configuracion-autorizacion',
    component: AutorizacionComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'lista-procesos-nuevos',
    component: ListaProcesosNuevosComponent
  },
  {
    path: 'lista-procesos-activos',
    component: ListaProcesosActivosComponent
  },
  {
    path: 'lista-procesos-termiandos',
    component: ListaProcesosTerminadosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
