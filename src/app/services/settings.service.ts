import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');


  constructor() { 

     // recuperar theme del localSorage | este url puede venir vacio, asi que se establece un color
     const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css' ;
   
     this.linkTheme?.setAttribute('href', url);

  }

  changeTheme( theme: string){
  
    const url = `./assets/css/colors/${ theme }.css`;  
   // remplazamo atributo
   this.linkTheme?.setAttribute('href', url);
   // guardar theme en localStorege
   localStorage.setItem('theme', url);
   // Aplicar el codigo que mandamos a localStorage y ponerlo cuando la aplicacion cargue 

   this.checkCurrentTeam();

   }

   
  checkCurrentTeam(){ // es malo que se salte al DOM cada que esto se ejecuta
    const links = document.querySelectorAll('.selector');;

    // elem - es el nombre de un solo nodo de todos los que recuperamos
    links.forEach( elem => {

      elem.classList.remove('working');
      // tenemos que saber dos cosas, si estas hacen mach, se pone la flecha en ese elemento
      const btnTheme =elem.getAttribute('data-theme');
      // getAttribute para obtener un atributo personalizado - en este caso(data-theme que esta en el HTML)
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css` //obtenemos el elemento tal cual que debe de estar en el elemento HTML
      const currentTheme = this.linkTheme?.getAttribute('href');

      // si currenTheme coincide con btnThemeUrl - mandamos el elemento a elem
      if(btnThemeUrl === currentTheme){
        // si son iguales agregamos una clase
        elem.classList.add('working');
      }
    });
  }
}
