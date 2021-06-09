import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

 declare function customInitFunctions(): void ; // le indicamos que confie en nosotros que tenemos una const global  

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {


  constructor( private setingsService: SettingsService) { }

  ngOnInit(): void {
    customInitFunctions();
    customInitFunctions();
  }

}
