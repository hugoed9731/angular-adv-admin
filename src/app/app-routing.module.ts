import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'; // exportamos este modulo para que cualquier otro modulo use it

// Modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';




import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const routes: Routes = [
    // cada uno de los elementos de mis Routes es un objeto
  //  path: '/dashboard' PagesRouting
  //  path: '/auth' AuthRouting
    // el path vacio va a redireccionar a dashboard
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', component: NopagefoundComponent } //cuando no esta vacio y no redirije a ningun componente

];

@NgModule({
  imports: [
    RouterModule.forRoot( routes ), // mandamos nuestro arreglo
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
