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
import { delay, tap, map, filter, mergeMap, startWith } from "rxjs/operators";
const apiData2 = ajax('/assets/result.json');

import * as moment from 'moment';
import { newArray } from '@angular/compiler/src/util';
const date = new Date();
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  newMTTRList: any = [];
  private subscription: Subscription | undefined;
  dataObserver$!: Observable<any[]>;
  loading: boolean = false;
  startDate = date.setDate(date.getDate() - 7);
  overAllData: any;
  dateFrom: any;
  dateTo: any;

  options: CloudOptions = {
    width: 0.8,
    height: 320,
    overflow: false,
    zoomOnHover: {
      scale: 1.2,
      transitionTime: 0.3,
      delay: 0.3
    },
    realignOnResize: true
  };
  data: CloudData[] = [];
  myData = [
    ['London', 8136000],
    ['New York', 8538000],
    ['Paris', 2244000],
    ['Berlin', 3470000],
    ['Kairo', 19500000]
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
  // originalData: any = [];
  TrendAnalysis: any = {
    xAxis: [], yAxis: [], zAxis: [],
    Priority: []

  }; //headmap
  jsonResponse: any = [];
  responseResult: any;
  tagWithDate: any = [];
  getTotalTickets(myArray: any) {
    this.totalData = [];
    this.data = [];

    of(myArray).pipe(concatMap((item) => of(item).pipe(delay(0)))).subscribe((timedItem: any) => {
      // console.log(timedItem);
      this.totalData = timedItem;
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
      this.getWordCloud(this.totalCategory)

    });

  }
  getWordCloud(result: any) {

    this.data = result.map((item: any) => {
      return {
        text: `${item.key}`, weight: item.count
      }
    });
    this.loader = false;

  }
  getTagData(result: any) {

    if (result) {

      // get all catg of TAGS starts
      const tagKey = "Tag";
      const uniq = result.map((item: any) => {
        return item[tagKey];
      })
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

  getTags(category: any) {
    const catg = Object.values(category).map(x => x)
    const totalCategory = [...new Set(catg)].map(z => z);///get total tags with uniq
    this.totalCategory = [];
    for (let a of totalCategory) {
      // reform tags
      let item: any = {};
      item.key = a;
      item.count = 0;
      const newArr = catg.filter((obj: any) => {
        return obj == a;
      })
      if (newArr.length > 0) {
        item.count = newArr.length;
      }
      if (item.key) {
        this.totalCategory.push(item)
      }
    }
    console.log(this.totalCategory)
    this.newLabel = "Tags vs Tags count";
    this.getWordCloud(this.totalCategory)
  }

  getTotalServReq() {
    return 130;
  }

  ngOnInit(): void {


    this.dateTo = new Date();
    let fromdate: any = moment().subtract(10, 'months');
    this.dateFrom = new Date(fromdate);
    // console.log(this.dateTo, this.dateFrom)
    this.initCall();
    // this.initCall2();
  }
  dateOccurance(all_dates: any) {
    let newArr = [];
    const newall_dates = Object.values(all_dates).map((z: any) => moment(z).format("DD-MM-YYYY"));

    let uniqDates: any = this.getDates2(all_dates);
    // console.log(uniqDates)
    for (let a of uniqDates) {
      let item: any = {}
      item.data = [];
      item.data = newall_dates.filter((z: any) => {
        return z == a;
      }).map(res => {
        item.date = a;
        return res ? 1 : 0;
      })
      newArr.push(item.data)
    }
    // console.log(newArr)
    // console.log(this.tagWithDate)
    return newArr;
  }

  dateOccurance2(all_dates: any) {
    let newArr = [];
    const newall_dates = Object.values(all_dates).map((z: any) => moment(z).format("DD-MM-YYYY"));


    for (let d of this.TrendAnalysis.zAxis) {
      let item: any = {}
      item.data = [];
      for (let a of d.dates) {

        item.data = newall_dates.filter((z: any) => {
          return z == a;
        }).map(res => {
          item.date = a;
          return res ? 1 : 0;
        })
        newArr.push(item.data)
      }
    }

    let uniqDates: any = this.getDates2(all_dates);

    // console.log(uniqDates)
    for (let a of uniqDates) {
      let item: any = {}
      item.data = [];
      item.data = newall_dates.filter((z: any) => {
        return z == a;
      }).map(res => {
        item.date = a;
        return res ? 1 : 0;
      })
      newArr.push(item.data)
    }
    // console.log(newArr)
    console.log(this.tagWithDate)
    return newArr;
  }

  getAllTags(arr: any) {
    return Object.values(arr).map((z: any) => z);
  }
  getAllDateTimes(all_dates: any) {
    return Object.values(all_dates).map((z: any) => z);

  }

  getAllUpdatedDates(all_dates: any) {
    return Object.values(all_dates).map((z: any) => moment(z).format("DD-MM-YYYY"));

  }

  getDates2(all_dates: any) {
    const val = Object.values(all_dates).map((z: any) => moment(z).format("DD-MM-YYYY"));
    const uniq = [...new Set(val)].map(z => z);
    return uniq;
  }
  getCatg(all_category: any) {
    const Catg = Object.values(all_category).map(z => z);
    const uniq = [...new Set(Catg)].map(z => z);
    return uniq;
  }

  getMTTR(resp: any) {
    if (resp.Tag) {
      // this.originalData.push(resp);
      const index = this.newMTTRList.findIndex((key: any) => {
        return key.Tag == resp.Tag;
      })
      if (index == -1) {
        // not found then push
        this.newMTTRList.push(resp)
      } else {
        // existing
        this.newMTTRList[index].hours = resp.hours;
        this.newMTTRList[index].count++;
      }
    }

  }

  startPriority(dateFrom: any, dateTo: any) {
    const { Priority, Opened, Resolved } = this.responseResult;

    this.TrendAnalysis.Priority = [];
    this.getPriority(Priority, dateFrom, dateTo);
    this.TrendAnalysis.PriorityLabel = 'Priority vs Count'//done
    console.log('PriorityLabel', this.TrendAnalysis)
  }
  loadData(dateFrom: any, dateTo: any) {
    const { pred_category, Updated, Priority, Opened, Resolved } = this.responseResult;
    // MTTR analysis. i.e.  (END TIME – START TIME)= MTTR.  if ticket is created at 01.01.2022 at 12pm and closed at 02.01.2022 at 1pm then MTTR is 25 hours. For each TAGS we should have a AVERAGE MTTR.

    // start-- format opened dates starts
    const openedDates = this.getAllDateTimes(Opened);
    // format Resolved dates starts
    const ResolvedDates = this.getAllDateTimes(Resolved);
    // get all tags
    const alltags = this.getAllTags(pred_category);


    from(openedDates).pipe(map((key: any, index) => {

      return {
        Opened: new Date(key),
        Resolved: new Date(ResolvedDates[index]),
        Tag: alltags[index],
        hours: this.api.diff_hours(new Date(ResolvedDates[index]), new Date(key)),
        count: 1
        // index:index
      }

    }), filter((req: any) => {
      var date = req.Resolved;
      const start = new Date(dateFrom);
      const end = new Date(dateTo);
      return (date >= start && date <= end);
    })

    ).subscribe(resp => {
      // console.log('subscribe', resp)
      this.getMTTR(resp);
      this.loading = false;
    })
  }
  getYaxisDates(all_dates: any) {
    const val = Object.values(all_dates).map((z: any) => new Date(z));
    // const val = Object.values(all_dates).map((z: any) => moment(z).format("DD-MM-YYYY"));

    // const uniq = [...new Set(val)].map(z => z);
    const yaxis = val.filter((req: any) => {
      var date = new Date(req);
      // console.log(date)
     
      const start = new Date(this.dateFrom);
      const end = new Date(this.dateTo);
      // console.log(start)
      // console.log(end)
      return (date >= start && date <= end);
    })
    this.loading = false;
    return yaxis;
  }

  initCall2(){
    this.api.getDatafromCSV2().then(result=>{
      console.log(result)
      // const alltags = this.getAllTags(pred_category);
      from(result).pipe(map((key: any, index) => {

        // return {
        //   Opened: new Date(key),
        //   Resolved: new Date(ResolvedDates[index]),
        //   Tag: alltags[index],
        //   hours: this.api.diff_hours(new Date(ResolvedDates[index]), new Date(key)),
        //   count: 1
        
        // }
        return key
  
      }), filter((req: any) => {
        var date = req.Resolved;
        const start = new Date(this.dateFrom);
        const end = new Date(this.dateTo);
        return (date >= start && date <= end);
      })
  
      ).subscribe(resp => {
        console.log('subscribe', resp)
        // this.getMTTR(resp);
        this.loading = false;
      })

    })
  }
  initCall() {

    this.api.getTickets().subscribe(result => {
      if (result) {
        console.log(result)
        this.responseResult = result[0];
        this.loadData(this.dateFrom, this.dateTo);
        const { pred_category, Updated, Priority, Opened, Resolved } = result[0];
       
        console.log('newMTTRList', this.newMTTRList);

        // get all tags
        const alltags = this.getAllTags(pred_category);


        // format tags with dates starts
        const tagsDates = this.getAllUpdatedDates(Updated);
        // console.log(tagsDates)

        this.tagWithDate = [];
        alltags.forEach((ele, index) => {

          let item: any = {};
          item.Tag = ele;
          item.date = tagsDates[index];
          this.tagWithDate.push(item)
        })
        // console.log(this.tagWithDate)

        const uniqTags = this.getCatg(pred_category);//get unique tag names
        let newuniqTags: any = []
        for (let a of uniqTags) {

          this.tagWithDate.filter((itm: any) => {
            return itm.Tag == a;
          }).map((res: any) => {
            // console.log(res)
            let idx = newuniqTags.findIndex((obj: any) => {
              return obj.Tag == res.Tag;
            })
            if (idx == -1) {
              let item: any = {
                Tag: res.Tag,
                dates: [res.date],
              }
              newuniqTags.push(item)
            } else {
              newuniqTags[idx].dates.push(res.date)
            }

          })

        }


        for (let a of newuniqTags) {
          a.dateOccurance = [];

          for (let date of a.dates) {

            let idx = a.dateOccurance.findIndex((obj: any) => {
              return obj.date == date;
            })
            if (idx == -1) {
              let occur = 0;
              a.dateOccurance.push(
                {
                  date: date, occurance: occur + 1
                }
              )

            } else {
              a.dateOccurance[idx].occurance++
            }
          }

        }
        console.log(newuniqTags)
        // format tags with dates ends


        // heatmat starts
        this.getTrendAnalysisData();
        // this.TrendAnalysis.xAxis = this.getCatg(pred_category);
        // this.TrendAnalysis.yAxis = this.getDates(Updated);

        // this.TrendAnalysis.zAxis = this.dateOccurance(Updated);
        // console.log(this.dateOccurance(Updated))
        // console.log(this.dateOccurance2(Updated))
        this.TrendAnalysis.zAxis = newuniqTags;

        // bar chart- 
        // Priority analysis i.e. graph for priority vs their count ( with filters for request/incident)

        this.startPriority(this.dateFrom, this.dateTo);


        this.overAllData = result;

        of(result).pipe(map(res => res)).subscribe(itm => {
          // console.log('itm', itm)
          this.jsonResponse = itm.map((item: any) => {
            // console.log(item)
            let dindex = 0;
            let totalMonth = 0;
            for (let a of Object.values(item.Resolved)) {

              let opened: any = Object.values(item.Opened)[dindex];

              let resolved: any = a;

              // console.log(typeof opened, typeof resolved)
              if (typeof opened == 'number' && typeof resolved == 'number') {
                // opened = parseInt(opened);
                // resolved = parseInt(resolved);
                let d1: any = new Date(opened).toISOString();
                let d2: any = new Date(resolved).toISOString();
                var months;


                d1 = moment(d1).format("DD/MM/YYYY");
                d2 = moment(d2).format("DD/MM/YYYY");

                const getDate = (date: moment.MomentInput) => moment(date, 'DD/MM/YYYY').startOf('month')

                const diff = Math.abs(getDate(d1).diff(getDate(d2), 'months'));

                totalMonth = totalMonth + diff;
              }

              dindex++;
            }

            // total service req
            const totalServiceReq = this.getTotalServReq()

            return {
              Incidentstate: item['Incident state'],
              TotalTickts: Object.keys(item['Incident state']).length,
              totalMonths: totalMonth,
              Tags: this.getTags(item.pred_category),
              totalServReq: totalServiceReq,
              totalIncident: Object.keys(item['Major Incident']).length
            }
          });
        })


        console.log(this.jsonResponse)


      }
    });

  }

  getTrendAnalysisData() {
    const { pred_category, Updated } = this.responseResult;

    this.TrendAnalysis.xAxis = this.getCatg(pred_category);
    this.TrendAnalysis.yAxis = this.getYaxisDates(Updated);
  }
  getPriority(Priority: any, dateFrom: any, dateTo: any) {
    // console.log('Priority', dateFrom, dateTo)
    let newArray: any = [];
    const start = moment(dateFrom).format("DD-MM-YYYY");
    const end = moment(dateTo).format("DD-MM-YYYY");
    // console.log('start end', start, end)

    const { Resolved } = this.responseResult;

    let ResolvedList: any[] = Object.values(Resolved).map(z => z);

    let list: any = [];
    Object.values(Priority).forEach((z: any, index: number) => {

      let item: any = {};
      item.key = z;
      item.Resolved = new Date(ResolvedList[index]);

      item.Resolved = moment(item.Resolved).format("DD-MM-YYYY");
      list.push(item)
    });

    of(list).pipe(map((a: any) => {
      return a;
    })).subscribe(result => {
      // console.log('Priority result', result)

      this.loading = false;
      result.forEach((rest: any) => {
        // console.log('rest.Resolved',rest.Resolved)
        if (new Date(rest.Resolved) >= new Date(start) && new Date(rest.Resolved) <= new Date(end)) {
          // console.log('rest.Resolved',rest.Resolved)
          newArray.push(rest.key);
        }
      })
      // get unique
      const uniq = [...new Set(newArray)].map(z => z);
      let total: any = [];
      // console.log(uniq)
      uniq.forEach((a: any) => {
        if (a) {
          let item: any = {};
          item.key = a;
          item.count = 0;
          const newArr = newArray.filter((obj: any) => {
            return obj == a;
          })
          // console.log(newArr)
          if (newArr.length > 0) {
            item.count = newArr.length;
          }
          this.TrendAnalysis.Priority.push(item)
        }
      })
      return total;
    })




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
  // async getData() {
  //   let url = '/../assets/test-data2.xlsx';
  //   const data = await (await fetch(url)).arrayBuffer();
  //   /* data is an ArrayBuffer */
  //   const workbook = XLSX.read(data);
  //   const firstSheetName = workbook.SheetNames[0];
  //   const worksheet = workbook.Sheets[firstSheetName];
  //   const sheetValues = XLSX.utils.sheet_to_json(worksheet);

  //   const groupByCategory = sheetValues.reduce((group, product) => {
  //     this.arr.push(product)
  //   })
  //   this.dataObserver$ = of(this.arr).pipe(concatMap(item => of(item).pipe(delay(1000))));
  //   this.dataObserver$.subscribe(z => {
  //     // console.log(z)
  //     this.totalData = z;
  //     if (z) {
  //       this.loader = false;
  //     }
  //     this.totalClosedData = z.filter(item => {
  //       return item.Status == "CLOSED";
  //     })
  //     this.totalunClosedData = z.filter(item => {
  //       return item.Status != "CLOSED";
  //     })
  //     this.totalResolvedData = z.filter(item => {

  //       return item["Resolved Status"] == "Resolved";
  //     })
  //     const loc = z.map(item => {
  //       return item["Location"];
  //     })
  //     this.totalLoc = [...new Set(loc)].map(z => z);

  //     // get all catg of TAGS starts
  //     const tagKey = "Tag";
  //     const uniq = z.map(item => {
  //       return item[tagKey];
  //     })
  //     // console.log('uniq', uniq)
  //     const totalCategory = [...new Set(uniq)].map(z => z);///get total tags with uniq
  //     this.totalCategory = [];
  //     for (let a of totalCategory) {
  //       // reform tags
  //       let item: any = {};
  //       item.key = a;
  //       item.count = 0;
  //       const newArr = this.totalData.filter((obj: any) => {
  //         return obj[tagKey] == a;
  //       })
  //       if (newArr.length > 0) {
  //         item.count = newArr.length;

  //       }
  //       this.totalCategory.push(item)
  //     }
  //     this.newLabel = "Tags vs Tags count";
  //     // get all catg of TAGS ends

  //     // word cloud starts

  //     // this.data = [
  //     //   { text: 'Web App', weight: 1, position: { left: 2, top: 50 } },
  //     //   { text: 'Test Cases', weight: 2 },
  //     //   { text: 'Approval Pending', weight: 3, position: { left: 12, top: 60 } },
  //     //   { text: 'Result Weight', weight: 5 },
  //     //   { text: 'Big data', color: 'red', weight: 6, position: { left: 2, top: 110 } },
  //     //   { text: 'Mail Request', weight: 2 },
  //     //   { text: 'Output:Success', weight: 3, position: { left: 514, top: 130 } },
  //     //   { text: 'Analysis', weight: 1 },
  //     //   { text: 'Random View', color: 'white', weight: 2, position: { left: 6, top: 15 } },

  //     // ];
  //     // const data =   this.totalData.filter((item: any) => {        
  //     //   return item.Tag;
  //     // }).map((result:any)=>{
  //     //   return {
  //     //     text: result.Tag, weight: 2
  //     //     ,
  //     //     position: { left: 2, top: 50 } 
  //     //   }
  //     // })

  //     const myArray = this.totalData;
  //     if (this.totalCategory.length > 0) {


  //       this.data = this.totalCategory.map((item: any) => {
  //         return {
  //           text: item.key, weight: item.count
  //         }
  //       });
  //     }
  //     from(myArray).pipe(concatMap((item) => of(item).pipe(delay(1000))))
  //       .subscribe((timedItem: any) => {
  //         console.log(timedItem);
  //         // this.data.push({

  //         //   text: timedItem.Tag, weight: 2
  //         //   ,
  //         //   position: { left: 2, top: 50 }

  //         // })
  //         console.log(this.data)
  //       });



  //     // word cloud ends


  //   })

  // }
  log(eventType: string, e?: any) {
    // console.log(eventType, e);
  }
  TrendFilter(e: any) {
    if (e) {
      this.loading = true;
      // this.TrendAnalysis.xAxis = [];
      this.TrendAnalysis.yAxis = [];
      // this.TrendAnalysis.zAxis = [];
      this.dateFrom = e.START_DATE;
      this.dateTo = e.END_DATE;
      this.TrendAnalysis.optionName = e.heatMapFilterBy ? e.heatMapFilterBy : '';
      console.log(this.TrendAnalysis)
      // get from original data
      const { pred_category, Updated } = this.responseResult;

      this.TrendAnalysis.yAxis = this.getYaxisDates(Updated);

    }
  }

  getPriorityFilter(e: any) {
    if (e) {
      this.loading = true;
      this.TrendAnalysis.Priority = [];
      this.startPriority(new Date(e.START_DATE), new Date(e.END_DATE));
    }

  }
  getFilter(e: any) {
    // console.log(e)
    if (e) {
      this.loading = true;

      this.newMTTRList = [];

      this.loadData(new Date(e.START_DATE), new Date(e.END_DATE));

    }
  }

  downloadCSV() {
    var data = [];
    data=this.newMTTRList; 

    const hdr=data[0];
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Tag Report',
      useBom: true,
      noDownload: false,
      headers: Object.keys(hdr).map(z=>z),
      useHeader: true,
      nullToEmptyString: true,
    };
    new AngularCsv(data,`TagReport${moment().format("DD-MM-YY")}`,options);
  }
}

function n(n: any) {
  throw new Error('Function not implemented.');
}

function ele(ele: any, any: any) {
  throw new Error('Function not implemented.');
}

