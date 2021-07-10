import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!:  File;
  public imgTemp: any = null;
  
  constructor( private fb: FormBuilder, private usuarioService: UsuarioService, private fileUploadService: FileUploadService) {
        this.usuario = usuarioService.usuario; // asignacion al puntero donde esta la informacion
   }

  ngOnInit(): void {
     
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });

  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
            .subscribe(() => {
              // en la resp viene la informacion actualizada en tiempo real
              const {nombre, email} = this.perfilForm.value;
              this.usuario.nombre = nombre;
              this.usuario.email = email;


              Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
            }, (err) => {
              Swal.fire('Error', err.error.msg, 'error');
                console.log(err.error.msg);
            });
  }

// seleccionamos la imagen desde el el file


cambiarImagen(file: any): any {
 
  if(file?.target?.files[0]){

    this.imagenSubir = file?.target?.files[0];

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.imagenSubir);
     // creamos un url64 que es la imagen readAsDataURL- nos tranforma la data
    // empieza la carga abajo mostramos el url con el codigo
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }
}

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
          .then(img => {
            this.usuario.img = img;
            
            Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
          
          }).catch(err => {
            console.log(err);
            Swal.fire('Error', 'No se pudo subir la imagen', 'error');
          });
          // cambiar imagen de manera automatica de las otras partes

          
  }

}




//  this.imagenSubir = file;

//       if( !file) {
//         return this.imgTemp = null;
//       }
    
//       const reader = new FileReader();
//       reader.readAsDataURL( file);

//       reader.onloadend = () => {
//         this.imgTemp = reader.result;
//         console.log(reader.result);
//       }

