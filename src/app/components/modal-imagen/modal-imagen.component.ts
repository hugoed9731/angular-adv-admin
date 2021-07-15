import { Component, OnInit } from '@angular/core';

import { FileUploadService } from '../../services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {


  public imagenSubir!:  File;
  public imgTemp: any = null;


  constructor(public modalImagenService: ModalImagenService, public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }



  cerrarModal() {
    this.imgTemp = null; // de esta manera al cerrar el modal quitamos la imagen presente
    this.modalImagenService.cerrarModal();
  }


  
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;


  this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
        .then(img => {
          Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');

          this.modalImagenService.nuevaImagen.emit(img);
          // img = url 

          this.cerrarModal();
        }).catch(err => {
          console.log(err);
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        });
        // cambiar imagen de manera automatica de las otras partes

        
}


}
