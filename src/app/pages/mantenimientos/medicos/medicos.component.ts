import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from '../../../models/medico.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;

  public medicos: Medico[] = [];

  private imgSubs?: Subscription;

  constructor( private medicoService: MedicoService, private modalImagenService: ModalImagenService,
                    private busquedasService: BusquedasService) { }
  ngOnDestroy(): void {
  //  limpiar la subscripcion
  // nodestroy previene fuja de memoria y escucha los cambios constantemente
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
      delay(100)
    ).subscribe( img => {this.cargarMedicos()});
  }


  cargarMedicos() {

    this.cargando = true;
    this.medicoService.cargarMedicos()
            .subscribe( medicos => {
              this.cargando = false;
              this.medicos = medicos,
              console.log(medicos);
            });
  }


  buscar( termino: string ):any {

    if ( termino.length === 0 ) {
      return this.cargarMedicos();
    }

    this.busquedasService.buscar( 'medicos', termino )
        .subscribe( resp => {

          this.medicos = resp as Medico[]; // casteo de informacion

        });
  }


  abrirModal(medico: Medico){
    console.log(medico);
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }


  borrarMedico(medico: Medico){
    Swal.fire({
      title: '¿Estás seguro de borrar este médico?',
      text: `Estás a punto de borrar a ${ medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id)
                .subscribe(resp=> {

                  this.cargarMedicos(); // actualiza la pagina y vemos los cambios
                  Swal.fire('Médico borrado', 
                  `${ medico.nombre } fue eliminado correctamente`, 
                  'success');
      
    });
  }
})
  }

}
