import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private usuarioService: UsuarioService, private router: Router ) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // canload - necesita una respuesta, un true o un false
    return this.usuarioService.validarToken()
    .pipe(    // esto solo se va a disparar si estaAutenticado es false
      tap(estaAutenticado => {
        if ( !estaAutenticado) {
            this.router.navigateByUrl('/login');
        }
      })
    );
  }
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