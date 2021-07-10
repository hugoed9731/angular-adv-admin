import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { 
    // el contructor siempre debe ser sincrono y regresar un instancia
   }
  // esto lo vamos a hacer mediante fetch de js
  /* fetch - podemos realizar peticiones HTTP
   asíncronas utilizando promesas y de forma que el código sea un poco más sencillo y menos verbose. */

   async actualizarFoto(
        archivo: File, 
        tipo: 'usuarios' | 'medicos' | 'hospitales',
        id?: string) {
        
          try {
            // enviar información al backend
            const url = `${base_url}/upload/${tipo}/${id}`;
            const formData = new FormData(); // esto es para crear la data que enviaremos al fetch
            formData.append('imagen', archivo); 


            // peticion fetch
            const resp = await fetch( url, {
              method: 'PUT', // método put igual que se definio en el backend
              headers: {
                'x-token': localStorage.getItem('token') || '' },
              body: formData // el body es todo lo que le queremos mandar a la peticion
            });

            const data = await resp.json(); // el body de la respuesta viene encapsulado, para verlo es asi

            if( data.ok) {
              return data.nombreArchivo;
            }else {
              console.log(data.msg);
               return false;
            }
          
        } catch (error) {
          console.log(error);
          return false;
        } 
   }

}
