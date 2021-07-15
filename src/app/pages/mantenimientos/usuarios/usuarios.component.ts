import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';


import { Usuario } from '../../../models/usuario.model';


import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs?: Subscription;

  public desde: number = 0;
  public cargando:boolean = true;

  constructor(private usuarioService: UsuarioService, private busquedasService: BusquedasService, private modalImagenService: ModalImagenService) { }
  ngOnDestroy(): void {
      this.imgSubs?.unsubscribe();
      // de esta manera esto no se va cargar accidentalmente
  }

  ngOnInit(): void {

   this.cargarUsuarios();

  //  nos subscribimos al nuevaImagen: EventEmitter
  this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
    delay(100)
  ).subscribe( img => {this.cargarUsuarios()});

  }


  cargarUsuarios(){
    this.cargando = true;

    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe( ({ total, usuarios}) =>  {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
        // if (usuarios.length !== 0) {
        //   
        // }
    });
  }



  cambiarPagina(valor: number){
    this.desde += valor; // si viene 5 le voy a sumar 5, si viene -5 le restamos 5

    if(this.desde < 0 ) {
        this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor; 
    }

    this.cargarUsuarios();
  }

  buscar( termino: string ):any {

    if ( termino.length === 0 ) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar( 'usuarios', termino )
        .subscribe( resp => {

          this.usuarios = resp;

        });
  }

  eliminarUsuario(usuario: Usuario):any {
      // no borrarme a mi mismo
      if (usuario.uid === this.usuarioService.uid) {
            return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
      }


    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de borrar a ${ usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
                .subscribe(resp=> {

                  this.cargarUsuarios(); // actualiza la pagina y vemos los cambios
                  Swal.fire('Usuario borrado', 
                  `${ usuario.nombre } fue eliminado correctamente`, 
                  'success');
      
    });
  }
})
  }

  cambiarRole(usuario:Usuario){
      console.log(usuario);
      this.usuarioService.guardarUsuario(usuario)
          .subscribe( resp => {
            console.log(resp);
            
          })
  }


  abrirModal(usuario:Usuario) {
    console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}
