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
import { Subscription, Observable, of, from, concatMap, switchMap, take } from 'rxjs';
import { delay } from "rxjs/operators";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  dataObserver$!: Observable<any[]>;


  // options: CloudOptions = {
  //   // if width is between 0 and 1 it will be set to the width of the upper element multiplied by the value
  //   width: 1000,
  //   // if height is between 0 and 1 it will be set to the height of the upper element multiplied by the value
  //   height: 400,
  //   overflow: false,
  // };
  options: CloudOptions = {
    width: 0.8,
    height: 400,
    overflow: false,
    zoomOnHover: {
      scale: 1.2,
      transitionTime: 0.3,
      delay: 0.3
    },
    realignOnResize: true
  };
  data: CloudData[] = [
    // { text: 'Web App', weight: 1, position: { left: 2, top: 50 } },
    // { text: 'Test Cases', weight: 2 },
    // { text: 'Approval Pending', weight: 3, position: { left: 12, top: 60 } },
    // { text: 'Result Weight', weight: 5 },
    // { text: 'Big data', color: 'red', weight: 6, position: { left: 2, top: 110 } },
    // { text: 'Mail Request', weight: 2 },
    // { text: 'Output:Success', weight: 3, position: { left: 514, top: 130 } },
    // { text: 'Analysis', weight: 1 },
    // { text: 'Random View', color: 'white', weight: 2, position: { left: 6, top: 15 } },

  ];

  constructor(public dialog: MatDialog, private api: ApiService) {
    this.initCall();
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

  getTotalTickets(myArray: any) {
    this.totalData = [];
    this.data=[];
    // from(myArray).subscribe(res => {
    //   // this.totalData=res;
    //   // console.log(res)
    //   this.totalData.push(res);
    //   this.data.push({

    //   })
    // })
    // of(myArray).subscribe((newItem:any)=>{
    //   console.log(newItem)
    //   // this.getTagData(newItem)
    // }) 

    of(myArray).pipe(concatMap((item) => of(item).pipe(delay(0)))).subscribe((timedItem: any) => {
      console.log(timedItem);
      this.totalData=timedItem;
      // get all catg of TAGS starts
      const tagKey = "Tag";
      const uniq = timedItem.map((item: any) => {
        return item[tagKey];
      })
      // console.log('uniq', uniq)
      const totalCategory = [...new Set(uniq)].map(z => z);///get total tags with uniq
      this.totalCategory = [];
      for (let a of totalCategory) {
        // reform tags
        let item: any = {};
        item.key = a;
        item.count = 0;
        const newArr = this.totalData.filter((obj: any) => {
          return obj[tagKey] == a;
        })
        if (newArr.length > 0) {
          item.count = newArr.length;
        }
        this.totalCategory.push(item)
      }
      this.newLabel = "Tags vs Tags count";
      
      // word cloud starts

    });


    // from(myArray).pipe(concatMap((item) => of(item).pipe(delay(0))))
    //   .subscribe((timedItem: any) => {
    //     // console.log(timedItem);
    //     this.totalData.push(timedItem);
    //   });
  }
  getWordCloud(result: any) {
    this.data = result.map((item: any) => {
      return {
        text: item.key, weight: item.count
      }
    });

  }
  getTagData(result: any) {
   
    if (result) {
      
      // get all catg of TAGS starts
      const tagKey = "Tag";
      const uniq = result.map((item: any) => {
        return item[tagKey];
      })
      // console.log('uniq', uniq)
      const totalCategory = [...new Set(uniq)].map(z => z);///get total tags with uniq
      this.totalCategory = [];
      for (let a of totalCategory) {
        // reform tags
        let item: any = {};
        item.key = a;
        item.count = 0;
        const newArr = this.totalData.filter((obj: any) => {
          return obj[tagKey] == a;
        })
        if (newArr.length > 0) {
          item.count = newArr.length;
        }
        this.totalCategory.push(item)
      }
      this.newLabel = "Tags vs Tags count";
      // get all catg of TAGS ends
      // call word coud
      if (this.totalCategory.length > 0) {
        this.getWordCloud(this.totalCategory);
      }
    }
  }
  initCall(){
    this.api.getDatafromCSV().then(result => {
      if (result) {
        // console.log(result)
        this.getTotalTickets(result);
        // this.getTagData(result);

      }
    });
  }
  ngOnInit(): void {

    // this.initCall()


    // this.getData()

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
    const item = {
      totalCategory: this.totalCategory, totalLoc: this.totalLoc
    }
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      backdropClass: 'backdropBackground', // This is the "wanted" line
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
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
  totalLoc: any = [];

  newLabel: any;
  async getData() {
    let url = '/../assets/test-data2.xlsx';
    const data = await (await fetch(url)).arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = XLSX.read(data);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const sheetValues = XLSX.utils.sheet_to_json(worksheet);

    const groupByCategory = sheetValues.reduce((group, product) => {
      this.arr.push(product)
    })
    this.dataObserver$ = of(this.arr).pipe(concatMap(item => of(item).pipe(delay(1000))));
    this.dataObserver$.subscribe(z => {
      // console.log(z)
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
      const loc = z.map(item => {
        return item["Location"];
      })
      this.totalLoc = [...new Set(loc)].map(z => z);

      // get all catg of TAGS starts
      const tagKey = "Tag";
      const uniq = z.map(item => {
        return item[tagKey];
      })
      // console.log('uniq', uniq)
      const totalCategory = [...new Set(uniq)].map(z => z);///get total tags with uniq
      this.totalCategory = [];
      for (let a of totalCategory) {
        // reform tags
        let item: any = {};
        item.key = a;
        item.count = 0;
        const newArr = this.totalData.filter((obj: any) => {
          return obj[tagKey] == a;
        })
        if (newArr.length > 0) {
          item.count = newArr.length;

        }
        this.totalCategory.push(item)
      }
      this.newLabel = "Tags vs Tags count";
      // get all catg of TAGS ends

      // word cloud starts

      // this.data = [
      //   { text: 'Web App', weight: 1, position: { left: 2, top: 50 } },
      //   { text: 'Test Cases', weight: 2 },
      //   { text: 'Approval Pending', weight: 3, position: { left: 12, top: 60 } },
      //   { text: 'Result Weight', weight: 5 },
      //   { text: 'Big data', color: 'red', weight: 6, position: { left: 2, top: 110 } },
      //   { text: 'Mail Request', weight: 2 },
      //   { text: 'Output:Success', weight: 3, position: { left: 514, top: 130 } },
      //   { text: 'Analysis', weight: 1 },
      //   { text: 'Random View', color: 'white', weight: 2, position: { left: 6, top: 15 } },

      // ];
      // const data =   this.totalData.filter((item: any) => {        
      //   return item.Tag;
      // }).map((result:any)=>{
      //   return {
      //     text: result.Tag, weight: 2
      //     ,
      //     position: { left: 2, top: 50 } 
      //   }
      // })

      const myArray = this.totalData;
      if (this.totalCategory.length > 0) {


        this.data = this.totalCategory.map((item: any) => {
          return {
            text: item.key, weight: item.count
          }
        });
      }
      from(myArray).pipe(concatMap((item) => of(item).pipe(delay(1000))))
        .subscribe((timedItem: any) => {
          console.log(timedItem);
          // this.data.push({

          //   text: timedItem.Tag, weight: 2
          //   ,
          //   position: { left: 2, top: 50 }

          // })
          console.log(this.data)
        });



      // word cloud ends


    })

  }
  log(eventType: string, e?: any) {
    console.log(eventType, e);
  }
}

function n(n: any) {
  throw new Error('Function not implemented.');
}
