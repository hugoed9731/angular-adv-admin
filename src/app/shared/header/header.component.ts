import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
// declare function customSidebar(): void;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: Usuario; 

  constructor(private usuarioService: UsuarioService, private router: Router) {
      this.usuario = usuarioService.usuario;
      console.log(this.usuario);
   }

  logout() {
    this.usuarioService.logout();
  }

  buscar(termino: string){
    if(termino.length === 0) {
      this.router.navigateByUrl('/dashboard');
    }
    console.log(termino);
    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`)
  }
}
