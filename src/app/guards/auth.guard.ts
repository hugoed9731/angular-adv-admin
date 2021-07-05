import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioService: UsuarioService, private router: Router ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    // Retorna directamente el producto de ese observable
    return this.usuarioService.validarToken()
          .pipe(    // esto solo se va a disparar si estaAutenticado es false
            tap(estaAutenticado => {
              if ( !estaAutenticado) {
                  this.router.navigateByUrl('/login');
              }
            })
          );
    // tiene que regresar true para dejarnos entrar a la ruta
    // El propósito de tap es ejecutar una acción manteniendo el mismo valor del observable
  }
  
}


// este archivo sirve para proteger rutas