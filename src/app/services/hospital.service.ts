import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

    
  constructor(private http: HttpClient) { }


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
      hospitales: Hospital[] }, el que se uso con la destructuración, en el this.http.get<> y modificar el header
  */
  cargarHospitales( ): Observable<Hospital[]> {
 
    const url = `${ base_url }/hospitales`;
    return this.http.get<{ ok: boolean, hospitales: Hospital[] }>(url, { headers: this.headers } )
            .pipe(
              map( (resp: { ok: boolean, hospitales: Hospital[] } ) => resp.hospitales )
            );
 
  }


  crearHospital( nombre:string | undefined){
 
    const url = `${ base_url }/hospitales`;
    return this.http.post(url, {nombre}, { headers: this.headers } );
 
  }


  
  actualizarHospital(_id: string | undefined  ,nombre:string){
 
    const url = `${ base_url }/hospitales/${ _id}`;
    return this.http.put(url, {nombre}, { headers: this.headers } );
 
  }

  borrarHospital(_id: string  | undefined  ){
 
    const url = `${ base_url }/hospitales/${ _id}`;
    return this.http.delete(url, { headers: this.headers } );
 
  }


}


// agregar paginacion a las tablas