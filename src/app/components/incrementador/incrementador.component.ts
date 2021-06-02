import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  ngOnInit() {
      this.btnClass = `btn ${ this.btnClass }`;
  }

//  @Input() progreso: number = 50;
  @Input('valor') progreso: number = 50;
  @Input() btnClass: string = 'btn-primary';
// valor es como se llamara el input, y así se debe de colocar donde lo invoquemos

  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();
  // output es de tipo event, nos permite emitir o hacer funciones en el padre (progress.module)


  cambiarValor( valor: number ){

    // RESOLUCION DEL PROFE

  //   if( this.progreso >= 100 && valor >= 0){
  //       this.valorSalida.emit(0);
  //        this.progreso = 100;
  //   }

  //   if( this.progreso <= 0 && valor < 0){
  //     this.valorSalida.emit(100);
  //      this.progreso = 0;
  // }

  // this.progreso = this.progreso + valor;
  // this.valorSalida.emit( this.progreso); 
  // -----------------------------------------------
    

  // MI RESOLUCION

    if (this.progreso + valor <= 100 && this.progreso + valor >= 0) {
      this.progreso += valor;
      this.valorSalida.emit(0);
      this.valorSalida.emit( this.progreso);
      // Cuando queramos disparar el evento personalizado invocaremos el método emit​() del objeto EventEmitter.
    }
// ----------------------------------------------------------------------

      // valor - es el que le sumo como argumento
  }


  onChange(nuevoValor: number) {
    if( nuevoValor >=100){
        this.progreso = 100;
    } else if ( nuevoValor <=0 ) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }

     this.valorSalida.emit(this.progreso); // emitimos this.progreso porque tiene el valor actualizado
  }

}
