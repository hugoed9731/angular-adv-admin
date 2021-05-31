import { NgModule } from '@angular/core';

// Modulos
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';




@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
    // le dice a Angular qué componentes pertenecen a ese módulo. A medida que crees más componentes, agrégalos a las declarations 
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  imports: [ 
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
