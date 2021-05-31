import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrubmsComponent } from './breadcrubms/breadcrubms.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    BreadcrubmsComponent,
    SidebarComponent,
    HeaderComponent
  ],
  exports: [
    BreadcrubmsComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
