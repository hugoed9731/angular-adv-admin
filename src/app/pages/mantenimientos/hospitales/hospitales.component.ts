import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { Hospital } from '../../../models/hospital.model';

import { HospitalService } from '../../../services/hospital.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;

  private imgSubs?: Subscription;


  constructor(private hospitalService: HospitalService, private modalImagenService: ModalImagenService, private busquedasService: BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarHospitales();

    //  nos subscribimos al nuevaImagen: EventEmitter para recargar la pagina automaticamente
  this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
    delay(100)
  ).subscribe( img => {this.cargarHospitales()});

  }


  buscar( termino: string ):any {

    if ( termino.length === 0 ) {
      return this.cargarHospitales();
    }

    this.busquedasService.buscar( 'hospitales', termino )
        .subscribe( resp => {

          this.hospitales = resp as Hospital[]; // casteo de informacion

        });
  }


  cargarHospitales() {
    this.cargando = true;

    this.hospitalService.cargarHospitales()
            .subscribe( hospitales => {
                this.cargando = false;
                this.hospitales = hospitales;
            });
  }
  

  guardarCambios( hospital: Hospital){
        console.log(hospital);
        this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
              .subscribe(resp => {
                Swal.fire('Actualizado', hospital.nombre, 'success');
              });
  }

  borrarHospital( hospital: Hospital){
    console.log(hospital);
    this.hospitalService.borrarHospital(hospital._id)
          .subscribe(resp => {
            this.cargarHospitales();
            Swal.fire('Borrado', hospital.nombre, 'success');
          });
}


async abrirSweetalert(){
  const { value = '' } = await Swal.fire<string | any>({
    title: 'Crear hospital',
    text: 'Ingrese el nombre del nuevo hospital',
    input: 'text',
    inputLabel: 'URL address',
    inputPlaceholder: 'Nombre del hospital',
    showCancelButton: true,
  })
  
  console.log();

  // asegurarnos que la persona ha escrito algo
  if(value.trim().length > 0) {
      this.hospitalService.crearHospital(value).subscribe((resp: any) => {
        console.log(resp);
        this.hospitales.push(resp.hospital)
      });
  }
}

abrirModal(hospital: Hospital){
  console.log(hospital);
  this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
}


}
