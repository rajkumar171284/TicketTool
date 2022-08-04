import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  getSampleTicket(): Observable<any> {
    const httpOptions = {
      // 'Accept':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      headers: new HttpHeaders(),
      // responseType: 'text'
      responseType: 'ResponseContentType.Blob'
      // observe: 'response',
      // responseType : 'application/octet-stream'
    };
    return this.http.get('assets/test-data2.xlsx', { responseType: 'text' }).pipe(map((response: any) => {
      return response;
    }));
  }

  getCSV() {
    return this.http.get('assets/test-data2.xlsx', { responseType: 'arraybuffer' as 'json', headers: { 'Content-Type': 'application/json' } }).pipe(map((response: any) => response));
  }

  async getDatafromCSV(): Promise<Observable<any>> {
    let arr: any = [];
    let url = 'assets/test-data2.xlsx';
    const data = await (await fetch(url)).arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = XLSX.read(data);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const sheetValues = XLSX.utils.sheet_to_json(worksheet);

    const groupByCategory = sheetValues.reduce((group, product) => {
      arr.push(product)
    })
    return arr;

  }

}
