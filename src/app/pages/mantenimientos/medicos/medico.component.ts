import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

import { Hospital } from '../../../models/hospital.model';
import { Medico } from '../../../models/medico.model';

import { MedicoService } from '../../../services/medico.service';
import { HospitalService } from '../../../services/hospital.service';
import { delay } from 'rxjs/operators';




@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado: Medico | undefined;
  public hospitalSeleccionado: Hospital | undefined;

  constructor(private fb: FormBuilder, private hospitalService: HospitalService, private medicoService: MedicoService,
                private router: Router, private activatedRoute: ActivatedRoute  ) { }

  ngOnInit(): void {
      // obtener id del medico
      this.activatedRoute.params
              .subscribe(({id}) => this.cargarMedico(id));
      // params - todos los parametros que vengan por url, desectructuramos params ({id})

      this.medicoForm = this.fb.group({
          nombre: ['', Validators.required],
          hospital: ['', Validators.required],
          
      });

  this.cargarHospitales();

  // crear observable que este pendiente de el hospital - valueChanges es el observable
  this.medicoForm.get('hospital')?.valueChanges
            .subscribe(hospitalId => {
               this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId); // esto es un funcion sincrona
               console.log(this.hospitalSeleccionado);
            });
  }

  cargarMedico( id: string ) {
 
    if ( id === 'nuevo') {
      return; // no carga el medico (no existe) si estamos creando un médico
    }
    this.medicoService.
  obtenerMedicoPorId( id )
        .pipe(
          (delay(100))
        )
        .subscribe((medico:any) => {

            const { nombre, hospital: { _id } } = medico;
            this.medicoSeleccionado = medico
            this.medicoForm.setValue( { nombre: nombre, hospital: _id} )
        }, error => {
          console.log(error);
          return  this.router.navigateByUrl(`/dashboard/medicos`);
          
        })
}

  cargarHospitales(){
    // cargar los ultimos hospitales registrados en la bd
    this.hospitalService.cargarHospitales()
          .subscribe((hospitales: Hospital[]) => {
              this.hospitales = hospitales;
          });
  }




  guardarMedico(){

    console.log(this.medicoSeleccionado);
    const {nombre} = this.medicoForm.value;


    if (this.medicoSeleccionado) {
        // actualizar
        const data = {
          ...this.medicoForm.value,
          _id: this.medicoSeleccionado._id
        }
        this.medicoService.actualizarMedico(data)
            .subscribe(resp => {
              console.log(resp);
              Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');

            })
    } else {
      // crear
      this.medicoService.crearMedico(this.medicoForm.value)
            .subscribe((resp: any) => {
              console.log(resp);
              Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
              this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id}`)
            })
    }

  
  }     

}
