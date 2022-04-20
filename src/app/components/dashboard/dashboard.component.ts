import { AfterViewInit,ElementRef, Component, OnInit,ViewChild , SimpleChanges} from '@angular/core';
// import { Chart } from 'chart.js';
import Chart from 'chart.js/auto';
import {MatDialog} from '@angular/material/dialog';
import {FilterDialogComponent} from '../../components/filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
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
