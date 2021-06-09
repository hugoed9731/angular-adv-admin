import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrubms',
  templateUrl: './breadcrubms.component.html',
  styles: [
  ]
})
export class BreadcrubmsComponent implements OnDestroy {

  public titulo!: string;
  public tituloSubs$: Subscription;

  constructor( private router: Router, private route: ActivatedRoute) { 
    
   
    this.tituloSubs$ =  this.getArgumentosRuta().subscribe( ({ titulo }) => {  
      this.titulo = titulo;
      document.title = `AdminPro - ${titulo}`;
      
    });
    //  la forma estricta que ofrece typescript, la solución a un problema que surge a la hora de filtrar los datos.
  
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

// El snapshot te da los parámetros del componente en el instante que los consultes. El objeto parmas contendrá todas las propiedades según los parámetros recibidos. Quiere decir que, el modelo lo recuperaremos con "this.
// instanceof - comprobar que es una instancia de, o que pertenece a un objeto
  getArgumentosRuta(){
   return this.router.events.pipe(
  filter( (event): event is ActivationEnd => event instanceof ActivationEnd ),
  filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
  map( (event: ActivationEnd) => event.snapshot.data),
);


  }
   

    // events es un observable


}
