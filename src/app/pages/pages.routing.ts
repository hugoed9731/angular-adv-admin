import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';


const routes: Routes = [
    // cada uno de los elementos de mis Routes es un objeto
    // aqui van a estars las rutas protegidas SOLO USUARIOS QUE TENGAN ACCESO AL SISTEMA
    // data es un objeto donde podemos mandar todo lo que queramos
    {path: 'dashboard',
     component: PagesComponent,
     canActivate: [AuthGuard],
     canLoad: [ AuthGuard],
     loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule)
    //  canLoad este load lo tenemos que implementar si estamos usando lazyload
    // verifica que la ruta se pueda cargar antes de hacer otra cosa
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