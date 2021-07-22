import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string | undefined , tipo: 'usuarios'| 'medicos'|'hospitales'): string | undefined{
    
    if(!img){
      return `${ base_url }/upload/usuarios/no-image`;
  } else if (img?.includes('https') ) {
      return img;
       /* includes() El método includes() determina si una cadena de 
  texto puede ser encontrada dentro de otra cadena de texto, devolviendo true o false según corresponda. 
  this.img && this.img.includes('https')*/
  } else if ( img ) {
      return `${ base_url }/upload/${tipo}/${ img }`;
  } else {
    // aqui no importa ya que si no hahy regresa la no-image
      return `${ base_url }/upload/usuarios/no-image`;
  }

  }

}


// el pipe funciona para transformar la forma visual de como recibo la informacion