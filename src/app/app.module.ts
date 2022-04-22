import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavFixedComponent } from './components/sidenav-fixed/sidenav-fixed.component';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ChartjsComponent} from './components/chartjs/chartjs.component';
import {FilterDialogComponent} from './components/filter-dialog/filter-dialog.component';
import {ControlsComponent} from './components/controls/controls.component';
import { TagCloudModule } from 'angular-tag-cloud-module';

@NgModule({
  declarations: [
    AppComponent,
    SidenavFixedComponent,DashboardComponent,ChartjsComponent,FilterDialogComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,MaterialModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,TagCloudModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
