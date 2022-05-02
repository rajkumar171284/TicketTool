import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import { ApiService } from '../api.service';

let micon = L.icon({
  iconUrl: 'assets/circle.png',
  iconSize: [7, 7]
});


@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.scss']
})
export class LeafletComponent implements OnInit, AfterViewInit {

  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 1,
      attributionControl: false

    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 1,
      attribution: '&copy; ',
      
    });

    tiles.addTo(this.map);


    var littleton = L.marker([39.61, -105.02], { icon: micon }).bindPopup('This is Littleton, CO.'),
      denver = L.marker([32.74, -104.99], { icon: micon }).bindPopup('This is Denver, CO.'),
      aurora = L.marker([33.73, -104.8], { icon: micon }).bindPopup('This is Aurora, CO.'),
      golden = L.marker([19.77, -115.23], { icon: micon }).bindPopup('This is Golden, CO.');
    var cities = L.layerGroup([littleton, denver, aurora, golden]);
    cities.addTo(this.map);

    this.api.getCities().subscribe(res => {
      // console.log('res', res);
      if (res && res.length > 0) {
        let i = 0;
        for (let a of res) {
          if (i < 2000) {
            let arr = L.marker([a.lat, a.lng], { icon: micon }).bindPopup(`${a.name},${a.country}`);
            arr.addTo(this.map);
          }
          i++;
        }
      }


    })


  }


  constructor(private api: ApiService) {


  }


  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit(): void {
  }

}
