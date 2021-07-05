import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form-interface';


// tap - es un operador que lanza un efecto secundario- adiciona un paso

const base_url = environment.base_url;

// declariones de google
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // declaracion de google
  public auth2: any;
// Ngzone - te permite trabajar con librerias de 3ros, en este caso angular
  constructor( private http: HttpClient, 
    private router: Router, private ngZone:NgZone) {
                  this.googleInit();
                  // esto solo se va a ejecutar una unica vez cada que la app se recarge
                }

  
  googleInit(){

    return new Promise( resolve => {
      console.log('google init');
      gapi.load('auth2', () =>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '483529011703-sjk9qm20pfcmnf92ig3dhtc9dk8vfn53.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        // cuando todo se ejecuta hay que exponer eso con resolve
        resolve(this.auth2);
      });
    })
   
  }


  logout () {
    localStorage.removeItem('token');

    // sigout esto viene de google
    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
      
  }



  // verificar el token cuando quieran ingresar a otras rutas
  // Renew Token
  // VALIDAR TOKEN - DEVUELVE UN BOOLEAN
  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    // peticion al backend
      return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        // ya tenemos una version del token
        localStorage.setItem('token', resp.token);
      }),
      // map tranforma la resp en boolean
      map( resp => true),
      // si devuelve un error vamos a manejarlo
      // of - retorna un nuevo observable
      catchError(error => of(false) )
      // atrapa el error que suceda en este observable
    );
  }


  crearUsuario(formData: RegisterForm){
    // aquí recibimos el formdata del formulario
    return this.http.post(`${base_url}/usuarios`, formData)
            .pipe(
              tap(( resp: any) => {
                localStorage.setItem('token', resp.token)
              })
            );
    
    // es una peticion post, el segundo argumento es la data
    // esto es un observable, que trae un respuesta de lo que trae el backend
    // regresamos todo el observable con return para subscribirnos en register.component.ts
  }



  
  login(formData: LoginForm){
    // aquí recibimos el formdata del formulario
    return this.http.post(`${base_url}/login`, formData)
              .pipe(
                tap(( resp: any) => {
                  localStorage.setItem('token', resp.token)
                })
              );
    // tap recibe lo que responda esa peticion
    // es una peticion post, el segundo argumento es la data
    // esto es un observable, que trae un respuesta de lo que trae el backend
    // regresamos todo el observable con return para subscribirnos en register.component.ts
  }


  // login con google

  loginGoogle( token: string ){
    // aquí recibimos el formdata del formulario
    return this.http.post(`${base_url}/login/google`, {token})
              .pipe(
                tap(( resp: any) => {
                  localStorage.setItem('token', resp.token)
                })
              );


}

// este servicio realiza peticiones HTTP
}