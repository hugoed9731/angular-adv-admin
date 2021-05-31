import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    

    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },

 


];

@NgModule({
  imports: [
    RouterModule.forChild( routes ) // mandamos nuestro arreglo
    // .forChild - lo tenemos que importar para que se sepa que se tiene otro sistema de rutas
  ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule {}