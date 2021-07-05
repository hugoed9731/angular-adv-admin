import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

// google
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit  {

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
        email:[ localStorage.getItem('email') || '' , [Validators.required, Validators.email]],
        password:['', Validators.required ],
        remember: [false]
  });

//  localStorage.getItem('email') || '' - si no existe un correo mandemos un string vacío

  constructor( private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService,
                    private ngZone: NgZone) { }
  ngOnInit(): void {
    this.renderButton();
  }


  login() {
    // validacion del formulario

    this.usuarioService.login(this.loginForm.value)
      .subscribe( resp => {

        if (this.loginForm.get('remember')?.value) {
            // si esta en true, guardar el localStorage
            localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          // el usuario no quiere que recordemos su email
          localStorage.removeItem('email');
        }
           // Navegar al DASHBOARD
           this.router.navigateByUrl('/');

      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');

      });
  } 

  // Login Google


  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
}


   async startApp() {
    await  this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin( document.getElementById('my-signin2') );
    };

  
   attachSignin(element: HTMLElement | null) {

  this.auth2.attachClickHandler(element, {},
      (googleUser: { getAuthResponse: () => { (): any; new(): any; id_token: string; }; }) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.usuarioService.loginGoogle( id_token )
                  .subscribe( resp => {
                    // usar ngzone - en librerias de terceros
                    this.ngZone.run( () => {
                      this.router.navigateByUrl('/');
                    });
                    console.log(resp);
                  });



      },(error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });

}

}