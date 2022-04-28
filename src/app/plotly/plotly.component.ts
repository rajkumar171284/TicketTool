import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';
import { Config, Data, Layout } from 'plotly.js';
@Component({
  selector: 'app-plotly',
  templateUrl: './plotly.component.html',
  styleUrls: ['./plotly.component.scss']
})
export class PlotlyComponent implements OnInit, OnChanges {
  @Input('pMap') pMap: any;
  public data: any;
  public layOut: any;
  // graph = {
  //   data: [
  //     { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: { color: 'gray' } },
  //     { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
  //   ],
  //   layout: { width: 520, height: 340, title: 'Sample Plot' }
  // };

  // public graph1 = {
  //   data: [{
  //     type: 'scattermapbox',
  //     lat: ['45.5017'],
  //     lon: ['-73.5673'],
  //     mode: 'markers',
  //     marker: {
  //       size: 14
  //     },
  //     text: ['Montreal']
  //   }],
  //   layout: {
  //     autosize: true,
  //     hovermode: 'closest',
  //     mapbox: {
  //       bearing: 0,
  //       center: {
  //         lat: 45,
  //         lon: -73
  //       },
  //       pitch: 0,
  //       zoom: 5
  //     },
  //   },
  //   mapboxaccesstoken: 'Entered mapbox access token here'
  // };

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)
    if (this.pMap === 'scatter2') {
      this.data = [
        { x: [1, 2, 3, 4, 5, 6, 7, 8, 9,], y: [2, 5, 3, 4, 7, 2, 44, 11, 1], type: 'bar', marker: { color: '#6666ff' }, backgroundColor: 'red' }

      ]

      this.layOut = {
        width: 520, height: 340, title: 'Bar chart',
        plot_bgcolor: "rgba(0,0,0,0)",
        paper_bgcolor: "rgba(0,0,0,0)",
      }

    } else
      if (this.pMap === 'scatter') {
        //   this.graph = {
        //     data: [
        //         { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
        //         { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
        //     ],
        //     layout: {width: 520, height: 340, title: 'Sample Plot'}
        // };
        this.data = [
          { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: { color: '#6666ff' } },
        ]
        // Plotly.newPlot('myDiv', data);
        this.layOut = {
          width: 520, height: 340, title: 'Line',
          plot_bgcolor: "rgba(0,0,0,0)",
          paper_bgcolor: "rgba(0,0,0,0)",

        }
      } else {
        this.data = [
          {
            z: [[1, 20, 30], [20, 1, 60], [30, 60, 1],
          
            [11, 210, 130], [200, 111, 160], [130, 60, 11]
          ],
            type: 'heatmap'
          }
        ];
        this.layOut = {
          width: 820, height: 390, title: this.pMap,
          plot_bgcolor: "rgba(0,0,0,0)",
          paper_bgcolor: "rgba(0,0,0,0)",
        }

      }
  }
}
