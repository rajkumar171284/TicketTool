import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartjsComponent } from './components/chartjs/chartjs.component';
import { FilterDialogComponent } from './components/filter-dialog/filter-dialog.component';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { PlotlyComponent } from './components/plotly/plotly.component';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;

import { LeafletModule } from '@asymmetrik/ngx-leaflet/';

import { LeafletComponent } from './components/leaflet/leaflet.component';
import { ApiService } from './api.service';
import { HeatmapPlotlyComponent } from './components/heatmap-plotly/heatmap-plotly.component';
import { SidenavModule } from './sidenav/sidenav.module';
import { UploadComponent } from './components/upload/upload.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ProgressiveActivityComponent} from './components/progressive-activity/progressive-activity.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { PapaParseModule } from 'ngx-papaparse';

@NgModule({
  declarations: [
    AppComponent, DashboardComponent, ChartjsComponent, FilterDialogComponent,
    PlotlyComponent, LeafletComponent, HeatmapPlotlyComponent,UploadComponent,ProgressiveActivityComponent
  ],
  imports: [
    BrowserModule,
    
    AppRoutingModule,
    BrowserAnimationsModule, MaterialModule,
    FormsModule,MatProgressSpinnerModule,NgxSkeletonLoaderModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule, TagCloudModule, PlotlyModule, LeafletModule, SidenavModule

  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
