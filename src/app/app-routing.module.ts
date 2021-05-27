import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'; // exportamos este modulo para que cualquier otro modulo use it
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
    // cada uno de los elementos de mis Routes es un objeto
    // aqui van a estars las rutas protegidas
    {path: '',
     component: PagesComponent,
     children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica1', component: Grafica1Component },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
     ]
    },
 
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },


    { path: '**', component: NopagefoundComponent } //cuando no esta vacio y no redirije a ningun componente

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes ) // mandamos nuestro arreglo
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
