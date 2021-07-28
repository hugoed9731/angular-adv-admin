import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
    // cada uno de los elementos de mis Routes es un objeto
    // aqui van a estars las rutas protegidas SOLO USUARIOS QUE TENGAN ACCESO AL SISTEMA
    // data es un objeto donde podemos mandar todo lo que queramos
    {path: 'dashboard',
     component: PagesComponent,
     canActivate: [AuthGuard],
     children: [
      { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
      { path: 'account-settings', component: AccountSettingsComponent, data:{titulo: 'Ajustes de Cuenta'}},
      { path: 'buscar/:termino', component:BusquedasComponent, data:{titulo: 'Busquedas'}},
      { path: 'grafica1', component: Grafica1Component, data:{ titulo: 'Grafica #1'} },
      { path: 'perfil', component: PerfilComponent, data:{titulo: 'Perfil de usuario'}},
      { path: 'progress', component: ProgressComponent, data:{ titulo: 'ProgressBar'} },
      { path: 'promesas', component: PromesasComponent, data:{titulo: 'Promesas'}},
      { path: 'rxjs', component: RxjsComponent, data:{titulo: 'Rxjs'}},


      // Mantenimientos
      { path: 'hospitales', component: HospitalesComponent, data:{titulo: 'Mantenimiento de Hospitales'}},
      { path: 'medicos', component: MedicosComponent, data:{titulo: 'Mantenimiento de Medicos'}},
      { path: 'medico/:id', component: MedicoComponent, data:{titulo: 'Mantenimiento de Medico'}},

      // Rutas de Admin
      { path: 'usuarios', canActivate:[AdminGuard], component: UsuariosComponent, data:{titulo: 'Mantenimiento de Usuarios'}},



      // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
     ]
    },
 


];

@NgModule({
  imports: [
    RouterModule.forChild( routes ) // mandamos nuestro arreglo
    // .forChild - lo tenemos que importar para que se sepa que se tiene otro sistema de rutas
  ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule {}