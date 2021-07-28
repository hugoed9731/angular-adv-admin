import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form-interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { Usuario } from '../models/usuario.model';



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
  // --------------
  // --------------
  public usuario!: Usuario;
// Ngzone - te permite trabajar con librerias de 3ros, en este caso angular
  constructor( private http: HttpClient, 
    private router: Router, private ngZone:NgZone) {
                  this.googleInit();
                  // esto solo se va a ejecutar una unica vez cada que la app se recarge
                }
  
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' | undefined {
    return this.usuario.role;
  }
  

  get uid():string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
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


  guardarLocalStorage(token: string, menu: any) {
        localStorage.setItem('token', token);
        localStorage.setItem('menu', JSON.stringify(menu));
        /* hay que pasar por esta peticion ya que es un arreglo
         pero lo leeremos como JSON COMO SI FUERA string 
         convierte un objeto o valor de JavaScript en una cadena de texto JSON*/
  }

  


  logout () {
    localStorage.removeItem('token');
    // TODO: Borrar menu
    localStorage.removeItem('menu');
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

    // peticion al backend
      return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
         // map tranforma la resp en boolean
        // ya tenemos una version del token
        // imagen vacia para evitar problemas con includes que lee la img undefined
        const { email, google, nombre, role, img = '', uid } = resp.usuario;
        // instanciamos el objeto
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        this.guardarLocalStorage(resp.token, resp.menu);
        return true;
      }),
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
                this.guardarLocalStorage(resp.token, resp.menu);

              })
            );
    
    // es una peticion post, el segundo argumento es la data
    // esto es un observable, que trae un respuesta de lo que trae el backend
    // regresamos todo el observable con return para subscribirnos en register.component.ts
  }



  actualizarPerfil(data: { email: string, nombre:  string, role: string | undefined}){

     // todo lo que tenga la data =  ...data
    data = {
      ...data, 
      role: this.usuario.role
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }


  
  login(formData: LoginForm){
    // aquí recibimos el formdata del formulario
    return this.http.post(`${base_url}/login`, formData)
              .pipe(
                tap(( resp: any) => {
                 this.guardarLocalStorage(resp.token, resp.menu);
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
                  this.guardarLocalStorage(resp.token, resp.menu);
                })
              );


}


cargarUsuarios(desde: number = 0) {
  
  const url = `${base_url}/usuarios?desde=${desde}`;
  return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        // delay(3000),  hacemo la carga de datos de usuario un poco mas lenta
        map( resp => {
          console.log(resp);
          // cambiar arreglo de objetos por uno de tipo usuarios
          const usuarios = resp.usuarios.map(
                user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid) )
          return {
            total: resp.total,
            usuarios
          };
        })
      )
}

    eliminarUsuario(usuario: Usuario) {
        // hacer la peticion al backen para eliminar el usuario 'endpoint'
        const url = `${base_url}/usuarios/${usuario.uid}`;
        return this.http.delete(url, this.headers);
        
    }


    guardarUsuario(usuario:Usuario){
     return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
   }
// este servicio realiza peticiones HTTP
}