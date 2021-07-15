import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {


  private _ocultarModal: boolean = true;
  // _ nos indica que es una propiedad privada, solo es un estandar
  // _ nos indica que es una propiedad privada, solo es un estandar
  public tipo: 'usuarios' | 'medicos' | 'hospitales' = "usuarios";
  public id?: string;
  public img?: string;

  // emite algo para actualizar el componente
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();
  // emite el strign de la nueva imagen

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(tipo: 'usuarios'|'medicos'|'hospitales',
  id?: string,
  img: string = 'no-img') {
    this._ocultarModal = false;

    this.tipo= tipo; // this.tipo es igual al tipo que recibimos como argumento
    this.id= id;
    if (img.includes('https')) {
        // si es una imagen de google
        this.img = img; // this.img es igual a la img que recibimos como argumento
    } else{
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
    // this.img = img;

  }

  
  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
