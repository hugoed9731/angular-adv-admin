import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intevalSubs: Subscription;

  constructor() { 
   
  // el observable no se ejecuta hasta que una persona se subscriba
  // this.retornaObservable().pipe(
    // el pipe es como una extension, podemos tener de ejemplo una manguera
    // retry(1) 
    // en este caso el retry, lo vuelve a intentar solo una vez
  // ).subscribe(
    // valor => console.log('Subs', valor),
    // error => console.log('Error', error), error del observable
    // () => console.info('Obs terminado')  cuando se hace complete, e complete no recibe ningun argumento
    // );


  this.intevalSubs =  this.retornaIntervalo().subscribe(console.log)
    // dentro de los parentesis del subscribe recibe los argumentos
  }
  ngOnDestroy(): void {
    this.intevalSubs?.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return  interval(500).pipe(
      // importa el orden en como los coloquemos, porque son operadores que van en cadena
      map( valor => valor + 1),
      filter( valor => (valor % 2 === 0) ? true:false), // lo que esta dentro de los parentesis es un operador ternario, un atajo de un if
      // take(10)
      // filter nos funciona para saber si queremos filtrar algo de manera condicional o no
    );

  }

  retornaObservable(){
    let i = -1;
    // $si hace referencia a un observable que quiero
    // observer - es el que va estar emitiendo los valores
  return new Observable<number>( observer => {  
 const intervalo = setInterval( ()=>{
   i++;
   observer.next(i); // next -es el siguiente valor que se va a emitir esto se les ntf a los subs
   if( i === 4){
      clearInterval( intervalo); // cancelamos el intervalo
      observer.complete(); // se termina el observable
   }

   if( i === 2) {
      observer.error('i llego al valor de 2');
   }
  }, 1000)
});


  }
 

}
