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
        { titulo: 'ProgressBar', url: 'progress'},
        { titulo: 'Gráficas', url: 'grafica1'}
      ]
    },
  ];

  constructor() { }
}
