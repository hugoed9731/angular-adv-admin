import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http:HttpClient) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(): any  {
    return {
        'x-token': this.token
    };
  }


  /*
    Relacionar el tipado { ok: boolean, 
      medicos: Medico[] }, el que se uso con la destructuración, en el this.http.get<> y modificar el header
  */
  cargarMedicos( ): Observable<Medico[]> {
 
    const url = `${ base_url }/medicos`;
    return this.http.get<{ ok: boolean, medicos: Medico[] }>(url, { headers: this.headers } )
            .pipe(
              map( (resp: { ok: boolean, medicos: Medico[] } ) => resp.medicos )
            );
 
  }

  obtenerMedicoPorId(id:string){
    const url = `${ base_url }/medicos/${id}`;
    return this.http.get<{ ok: boolean, medico: Medico }>(url, { headers: this.headers } )
            .pipe(
              map( (resp: { ok: boolean, medico: Medico } ) => resp.medico )
            );
  }


  crearMedico( medico: {nombre: string, hospital: string}){
 
    const url = `${ base_url }/medicos`;
    return this.http.post(url, medico, { headers: this.headers } );
 
  }


  
  actualizarMedico(medico: Medico){
 
    const url = `${ base_url }/medicos/${ medico._id}`;
    return this.http.put(url, medico, { headers: this.headers } );
 
  }

  borrarMedico(_id: string  | undefined  ){
 
    const url = `${ base_url }/medicos/${ _id}`;
    return this.http.delete(url, { headers: this.headers } );
 
  }

}
