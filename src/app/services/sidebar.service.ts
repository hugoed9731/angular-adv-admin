import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
// MENU DINAMICO DENTRO DEL ARREGLO | si despues queremos arreglar algo desde aqui se hace
  menu:any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/'},
        { titulo: 'Gráficas', url: 'grafica1'},
        { titulo: 'Rxjs', url: 'rxjs'},
        { titulo: 'Promesas', url: 'promesas'},
        { titulo: 'ProgressBar', url: 'progress'}
        
      ]
    },
  ];

  constructor() { }
}
