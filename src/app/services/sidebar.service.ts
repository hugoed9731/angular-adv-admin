import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
// MENU DINAMICO DENTRO DEL ARREGLO | si despues queremos arreglar algo desde aqui se hace

  public menu: any[] = [] ;

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu') || '') || [];
    /*JSON Parse analiza el contenido de una
     cadena con formato JSON y extrae los valores que puede almacenar en un campo o variable  */
  }

  // menu:any[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Main', url: '/'},
  //       { titulo: 'Gráficas', url: 'grafica1'},
  //       { titulo: 'Rxjs', url: 'rxjs'},
  //       { titulo: 'Promesas', url: 'promesas'},
  //       { titulo: 'ProgressBar', url: 'progress'}
        
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios'},
  //       { titulo: 'Hospitales', url: 'hospitales'},      
  //       { titulo: 'Médicos', url: 'medicos'},      
  //     ]
  //   },
  // ];

}
