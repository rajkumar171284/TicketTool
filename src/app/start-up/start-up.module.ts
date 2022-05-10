import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StartUpRoutingModule } from './start-up-routing.module';
import { StartComponent } from './start.component';
import { SidenavFixedComponent } from '../start-up/sidenav-fixed/sidenav-fixed.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    StartComponent,SidenavFixedComponent
  ],
  imports: [
    CommonModule,
    StartUpRoutingModule,MaterialModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class StartUpModule { }
