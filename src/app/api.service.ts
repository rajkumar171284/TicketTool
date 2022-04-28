import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
      
      // headers: new HttpHeaders(),
      // responseType: 'text'
      responseType: 'arraybuffer'
      // observe: 'response',
      // responseType : 'application/octet-stream'
    };
    return this.http.get('assets/Ticketdump2_sample.xlsx',{headers: new HttpHeaders(),responseType: 'blob'}).pipe(map((response: any) => {
      return response;
    }));
  }



}
