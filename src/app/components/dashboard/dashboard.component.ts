import { AfterViewInit, ElementRef, Component, OnInit, ViewChild, SimpleChanges, OnDestroy } from '@angular/core';
// import { Chart } from 'chart.js';
import Chart from 'chart.js/auto';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from '../../components/filter-dialog/filter-dialog.component';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

import { ApiService } from '../../api.service';
import { ajax } from 'rxjs/ajax';
// import{of} from'rxjs/o';
const apiData = ajax('/assets/Ticketdump2_sample.xlsx');
// import { WorkBook, read, utils, write, readFile, } from 'xlsx';
import * as XLSX from 'xlsx';
import { Subscription, Observable, of, concatMap } from 'rxjs';
import { delay } from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  dataObserver$!: Observable<any[]>;


  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the width of the upper element multiplied by the value
    width: 1000,
    // if height is between 0 and 1 it will be set to the height of the upper element multiplied by the value
    height: 400,
    overflow: false,
  };

  data: CloudData[] = [
    { text: 'Web App', weight: 1, position: { left: 2, top: 50 } },
    { text: 'Test Cases', weight: 2 },
    { text: 'Approval Pending', weight: 3, position: { left: 12, top: 60 } },
    { text: 'Result Weight', weight: 5 },
    { text: 'Big data', color: 'red', weight: 6, position: { left: 2, top: 110 } },
    { text: 'Mail Request', weight: 2 },
    { text: 'Output:Success', weight: 3, position: { left: 514, top: 130 } },
    { text: 'Analysis', weight: 1 },
    { text: 'Random View', color: 'white', weight: 2, position: { left: 6, top: 15 } },
    // { text: 'Weight-8-random', weight: 4 },

    // ...
  ];

  constructor(public dialog: MatDialog, private api: ApiService) {
  }
  monthsData: any = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  monthsData2: any = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ]
  ngOnInit(): void {
    this.getData()
    // this.getJSON()

    // apiData.subscribe(res => console.log(res.status, res.response));
    // this.subscription= this.api.getSampleTicket().subscribe(oReq => {

    //   var arraybuffer = oReq;
    //   console.log(arraybuffer)

    //   /* convert data to binary string */
    //   var data = new Uint8Array(arraybuffer);
    //   var arr = new Array();
    //   for (var i = 0; i != data.length; ++i) {
    //     arr[i] = String.fromCharCode(data[i]);
    //     // console.log("Data" + data[i]);
    //   }
    //   var bstr = arr.join("");
    //   var workbook = XLSX.read(bstr, { type: "binary" });
    //   //console.log("Data"+bstr);
    //   var first_sheet_name = workbook.SheetNames[0];
    //   /* Get worksheet */
    //   var worksheet = workbook.Sheets[first_sheet_name];
    //   var json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1, raw: true });
    //   var jsonOut = JSON.stringify(json);
    //   console.log("test" + jsonOut.length);
    //   for(let a of jsonOut){
    //     console.log("a" + a);
    //   }


    // })

    // this.api.getSampleTicket().subscribe(data => {
    //   console.log(data)
    //   const blob = new Blob([data._body],
    //     { type: 'application/json' });
    //   const file = new File([blob], 'report.json',
    //   {type:'mime'});
    //   console.log('file', file)

    //   // const contentType = data.type;
    //   // const blob = new Blob([data], { type: contentType });


    //   const url = window.URL.createObjectURL(blob);
    //   // window.open(url);
    //   let blob2 =  fetch(url).then(r => {

    //   //  console.log(r) 
    //     const d= r.blob()
    //     console.log(d) 

    //   });


    // const blob = new Blob([data],{ type: contentType });
    // var fileReader = new FileReader();
    // fileReader.readAsText(file,"UTF-8");
    // fileReader.onload = () => {
    //   console.log(fileReader.result?.toString());
    //   const str = fileReader.result?.toString();
    //   console.log(str);
    // const jsonObj=(JSON.parse(str));
    // console.log(jsonObj)
    // }



    // })

  }
  openDialog() {
    const dialogRef = this.dialog.open(FilterDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.monthsData = result.data;
      this.monthsData2 = result.data;
      console.log(`Dialog result: ${result}`);
    });
  }



  getJSON() {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", 'assets/Ticketdump2_sample.xlsx', true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function (e) {
      var arraybuffer = oReq.response;

      /* convert data to binary string */
      var data = new Uint8Array(arraybuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
        // console.log("Data" + data[i]);
      }
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      //console.log("Data"+bstr);
      var first_sheet_name = workbook.SheetNames[0];
      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1, raw: true });
      var jsonOut = JSON.stringify(json);
      // console.log("test" + jsonOut);

    }
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
  arr: any = [];
  totalData: any = [];
  totalClosedData: any = [];
  totalunClosedData: any = [];
  totalResolvedData: any = [];
  loader = true;
  totalCategory: any = [];
  newLabel:any;
  async getData() {
    let url = '/../assets/test-data2.xlsx';
    const data = await (await fetch(url)).arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = XLSX.read(data);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const sheetValues = XLSX.utils.sheet_to_json(worksheet);

    const groupByCategory = sheetValues.reduce((group, product) => {
      // console.log(product)
      this.arr.push(product)


    })
    this.dataObserver$ = of(this.arr).pipe(concatMap(item => of(item).pipe(delay(1000))));
    this.dataObserver$.subscribe(z => {
      console.log(z)
      this.totalData = z;
      if (z) {
        this.loader = false;
      }
      this.totalClosedData = z.filter(item => {
        return item.Status == "CLOSED";
      })
      this.totalunClosedData = z.filter(item => {
        return item.Status != "CLOSED";
      })
      this.totalResolvedData = z.filter(item => {

        return item["Resolved Status"] == "Resolved";
      })

      const uniq = z.map(item => {

        return item["Problem Category"];
      })
      console.log('uniq', uniq)
      const totalCategory = [...new Set(uniq)].map(z => z);
      this.totalCategory=[];
      for(let a of totalCategory){
        let item:any={};
        item.key=a;
        item.count=0;

        const newArr = this.totalData.filter((obj:any)=>{
        return obj["Problem Category"]==a;
        })
        if(newArr.length>0){
          item.count =newArr.length;

        }
        this.totalCategory.push(item)
      }
      this.newLabel='Problem Category'
      




    })

  }
}

function n(n: any) {
  throw new Error('Function not implemented.');
}
