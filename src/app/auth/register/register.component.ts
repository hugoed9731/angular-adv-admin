import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css']
})
export class RegisterComponent  {


  public formSubmitted = false;

  public registerForm = this.fb.group({
        nombre:['Hugo', Validators.required],
        email:['test10w00@gmail.com', [Validators.required, Validators.email]],
        password:['123456', Validators.required ],
        password2:['123456', Validators.required ],
        terminos:[true, Validators.requiredTrue ]
  }, {
    validators: this.passwordsIguales('password', 'password2')
    // este es un validador sincrrno- andentro los campos que queremos validar
  });

  constructor(private fb: FormBuilder, private  usuarioService: UsuarioService, private router: Router) { }

  // Método para capturar la información
  crearUsuario() {
    this.formSubmitted = true; // cuando enviemos el formulario cambiara a true
    console.log(this.registerForm.value);

    if( this.registerForm.invalid) {
      return; // si no es valido ponemos un return para que no siga haciendo lo demás
    }
    //  Realizar el posteo -Si es valido
    this.usuarioService.crearUsuario(this.registerForm.value)
          .subscribe(resp => {
            console.log('usuario creado');
            this.router.navigateByUrl('/');
          }, (err) => {
            // Si sucede un error - el segundo error es un icono
            Swal.fire('Error', err.error.msg, 'error');
          });
    // this.registerForm.value - esto es toda la data del formulario - que se recibe en el service
    // err.error.msg - ingresamos al error warn en consola más especifico- al msg que declaramos en el backend
  }


  campoNoValido(campo: string): boolean{
    // si es campo no es valido y ha sido posteado, voy a regresar un true
    if( this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    } else {
      return false;
    }

  }


  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if((pass1 !== pass2) && this.formSubmitted ) {
      // si las contraseñas son diferentes entonces ...
      return true;
    } else {
      // si las contraseñas son iguales...
      return false;
    }

  }


  passwordsIguales(pass1Name: string, pass2Name: string) {
      return ( formGroup: FormGroup ) =>{
        const pass1Control = formGroup.get(pass1Name);
        const pass2Control = formGroup.get(pass2Name);
        // Hasta aqui tenemos acceso a todos los controles de este formulario
        // Hay que preguntar si son iguales

        if(pass1Control?.value === pass2Control?.value) {
          // Ambas contraseñas son iguales, se deben de dejar pasar, no hay errores
          pass2Control?.setErrors(null);
        } else {
          // si no son iguales, muestra el siguiente error
          pass2Control?.setErrors({noEsIgual: true});
        }
      }
  }

}


// ventaja de los formularios reactivos, que todo lo podemos definir dentro del componente