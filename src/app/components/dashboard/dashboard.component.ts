import { AfterViewInit,ElementRef, Component, OnInit,ViewChild , SimpleChanges} from '@angular/core';
// import { Chart } from 'chart.js';
import Chart from 'chart.js/auto';
import {MatDialog} from '@angular/material/dialog';
import {FilterDialogComponent} from '../../components/filter-dialog/filter-dialog.component';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

import { ApiService } from '../../api.service';

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
    { text: 'Web App', weight: 1, position: { left: 2, top: 50 } },
    { text: 'Test Cases', weight:2 },
    { text: 'Approval Pending', weight: 3, position: { left: 12, top: 60 } },
    { text: 'Result Weight', weight: 5 },
    { text: 'Big data',color:'red', weight: 6, position: { left: 2, top: 110 } },
    { text: 'Mail Request', weight: 2 },
    { text: 'Output:Success', weight: 3, position: { left: 514, top: 130 } },
    { text: 'Analysis', weight: 1 },
    { text: 'Random View',color:'white', weight: 2, position: { left: 6, top: 15 } },
    // { text: 'Weight-8-random', weight: 4 },

    // ...
  ];

  constructor(public dialog: MatDialog,private api: ApiService) {
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

    this.api.getSampleTicket().subscribe(data=>{
      console.log(data)
      const contentType = data.type;
      // const blob = new Blob([data], { type: contentType });
      

    // const url = window.URL.createObjectURL(blob);
    // window.open(url);

    const blob = new Blob([data],{ type: contentType });
    var fileReader = new FileReader();
    fileReader.readAsText(blob);
    fileReader.onload = () => {
      console.log(fileReader.result?.toString());
      const str =fileReader.result?.toString();
      console.log(str);
      // const jsonObj=(JSON.parse(str));
      // console.log(jsonObj)
      }
      


    })

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
