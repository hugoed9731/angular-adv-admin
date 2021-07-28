import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';


@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {


  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];



  constructor( private activatedRoute: ActivatedRoute, private busquedasService: BusquedasService ) { }

  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe(({termino}) =>  this.busquedaGlobal( termino ) )
  }
  // los parmas es lo que se recibe por la url en este caso el termino de busqueda

  busquedaGlobal(termino: string) {
    this.busquedasService.busquedaGlobal(termino)
      .subscribe( (resp:any) => {
        console.log(resp);
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
        
        

      });
  }

  abrirMedico(medico: Medico) {
    
  }

}
