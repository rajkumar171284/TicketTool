import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment'
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { Subscription, Observable, of, from, concatMap } from 'rxjs';
import { delay } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCities(): Observable<any> {
    return this.http.get('assets/cities.json').pipe(map((response: any) => {
      return response;
    }));
  }
  getTickets(): Observable<any> {
    return this.http.get('assets/result.json').pipe(map((response: any) => {
      return response;
    }));
  }
  getTicketsByDateWise(req: any, currArray: any) {
    let arr: any = [];
    const index = currArray.filter((ele: any) => {
      var date = new Date(ele);
      const start = new Date(req.START_DATE);
      const end = new Date(req.END_DATE);
      return (date >= start && date <= end);
    })

    return index;
  }

  // getSampleTicket(): Observable<any> {
  //   const httpOptions = {
  //     // 'Accept':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //     headers: new HttpHeaders(),
  //     // responseType: 'text'
  //     responseType: 'ResponseContentType.Blob'
  //     // observe: 'response',
  //     // responseType : 'application/octet-stream'
  //   };
  //   return this.http.get('assets/test-data2.xlsx', { responseType: 'text' }).pipe(map((response: any) => {
  //     return response;
  //   }));
  // }

  // getCSV() {
  //   return this.http.get('assets/test-data2.xlsx', { responseType: 'arraybuffer' as 'json', headers: { 'Content-Type': 'application/json' } }).pipe(map((response: any) => response));
  // }



  // diff_hours2(dateFuture: any, dateNow: any) {
  //   let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

  //   // calculate days
  //   const days = Math.floor(diffInMilliSeconds / 86400);
  //   diffInMilliSeconds -= days * 86400;
  //   // console.log('calculated days', days);

  //   // calculate hours
  //   const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  //   diffInMilliSeconds -= hours * 3600;
  //   console.log('calculated hours', hours);

  //   // calculate minutes
  //   const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  //   diffInMilliSeconds -= minutes * 60;
  //   console.log('minutes', minutes);

  //   let difference = '';
  //   // if (days > 0) {
  //   //   difference += (days === 1) ? `${days} day, ` : `${days} days, `;
  //   // }

  //   difference += (hours === 0 || hours === 1) ? `${hours} hr, ` : `${hours} hrs, `;

  //   difference += (minutes === 0 || hours === 1) ? `${minutes} min` : `${minutes} mins`;

  //   return difference;
  // }
  // diff_hours3(dt2: Date, dt1: Date) {

  //   var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  //   diff /= (60 * 60);
  //   return Math.abs(Math.round(diff));

  // }

  diff_hours(dt2: any, dt1: any) {
    let today: any = dt1;
    let endDate: any = new Date(dt2.setDate(dt2.getDate() + 7));
    // let days:any = ((endDate - today) / (1000 * 60 * 60 * 24));
    const hours = (Math.abs(endDate - today) / (1000 * 60 * 60) % 24);
    const minutes = (Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60) % 60);
    // const seconds = (Math.abs(endDate.getTime() - today.getTime()) / (1000) % 60);
    return Math.round(hours);
    // return {hours:Math.round(hours),min:Math.round(minutes)};
  }


  async parseDatafromCSV2(file:any): Promise<Observable<any>> {
    let arr: any = [];
    let url = file;
    const data = await (await fetch(url)).arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = XLSX.read(file);
    console.log(workbook)

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const sheetValues = XLSX.utils.sheet_to_json(worksheet);
    console.log(sheetValues)


    // const groupByCategory = sheetValues.reduce((group, product: any) => {
    //   console.log(product)



     


    // })
    return arr
  }
  async getDatafromCSV2(): Promise<Observable<any>> {
    let arr: any = [];
    let url = 'assets/result.csv';
    const data = await (await fetch(url)).arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = XLSX.read(data);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const sheetValues = XLSX.utils.sheet_to_json(worksheet);

    const groupByCategory = sheetValues.reduce((group, product: any) => {
      console.log(product.Created)
      let newdate: any;
      if (product.Created) {
        const str = new Number(product.Created);
        const newstr = new String(str).split('.').join("");

        let d: any = Number(newstr);
        try {
          newdate = new Date(newstr).toISOString();
          // console.log(newdate)
          product.Created = moment(newdate).format("DD-MM-YY HH:mm:ss");

        }
        catch (err) {

        }




      }
      if (product.Resolved1) {
        const str = product.Resolved;
        const newstr = new String(str).split('.').map(num => Number(num));
        // const newstr = new String(str).split('.').join("");
        // const newNum = parseInt(newstr)
        console.log(newstr)
        // const newdate = new Date(newstr).toISOString();

        // product.Resolved = moment(newdate).format("DD-MM-YY HH:mm:ss");
      }
      arr.push(product)
    })
    return arr;

  }
  isValidDate(dateObject: any) {
    return new Date(dateObject).toISOString() !== 'Invalid Date';
  }
  async getDatafromCSV(): Promise<Observable<any>> {
    let arr: any = [];
    let url = 'assets/result.csv';
    const data = await (await fetch(url)).arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = XLSX.read(data);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const sheetValues = XLSX.utils.sheet_to_json(worksheet);

    const groupByCategory = sheetValues.reduce((group, product: any) => {
      if (product["Created Date"]) {
        const str = product["Created Date"];

        const newstr = new String(str).split('.').join("");
        const newNum = parseInt(newstr)
        const newdate = new Date(newNum).toISOString();

        product.CreatedDate = moment(newdate).format("DD-MM-YY HH:mm:ss");
      }
      arr.push(product)
    })
    return arr;

  }

}
