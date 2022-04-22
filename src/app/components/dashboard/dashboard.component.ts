import { AfterViewInit,ElementRef, Component, OnInit,ViewChild , SimpleChanges} from '@angular/core';
// import { Chart } from 'chart.js';
import Chart from 'chart.js/auto';
import {MatDialog} from '@angular/material/dialog';
import {FilterDialogComponent} from '../../components/filter-dialog/filter-dialog.component';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the width of the upper element multiplied by the value
    width: 1000,
    // if height is between 0 and 1 it will be set to the height of the upper element multiplied by the value
    height: 400,
    overflow: false,
  };

  data: CloudData[] = [
    { text: 'Weight-8-fixed', weight: 1, position: { left: 20, top: 130 } },
    { text: 'Weight-8-random', weight:2 },
    { text: 'Weight-8-fixed', weight: 3, position: { left: 120, top: 30 } },
    { text: 'Weight-8-random', weight: 5 },
    { text: 'Weight-8-fixed', weight: 10, position: { left: 40, top: 60 } },
    { text: 'Weight-8-random', weight: 8 },
    { text: 'Weight-8-fixed', weight: 3, position: { left: 20, top: 30 } },
    { text: 'Weight-8-random', weight: 6 },
    { text: 'Weight-8-fixed', weight: 2, position: { left: 10, top: 100 } },
    { text: 'Weight-8-random', weight: 4 },

    // ...
  ];

  constructor(public dialog: MatDialog) {
   }
   monthsData:any=[
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  monthsData2:any=[
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ]
  
  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(FilterDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.monthsData=result.data;
      this.monthsData2=result.data;
      console.log(`Dialog result: ${result}`);
    });
  }


}
