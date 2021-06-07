import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const routes: Routes = [
    // cada uno de los elementos de mis Routes es un objeto
    // aqui van a estars las rutas protegidas SOLO USUARIOS QUE TENGAN ACCESO AL SISTEMA
    {path: 'dashboard',
     component: PagesComponent,
     children: [
      { path: '', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica1', component: Grafica1Component },
      { path: 'account-settings', component: AccountSettingsComponent},
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