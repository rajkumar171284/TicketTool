import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';
import { Config, Data, Layout } from 'plotly.js';
import { Subject, BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-plotly',
  templateUrl: './plotly.component.html',
  styleUrls: ['./plotly.component.scss']
})
export class PlotlyComponent implements OnInit, OnChanges {
  @Input('pMap') pMap: any;
  public data: any;
  public layOut: any;
  graph = {
    data: [],
    layout: { width: 520, height: 340, title: 'Sample Plot' },
    pointIndex: 1
  };

  graph1 = {
    data: [
      { x: [1, 2, 3], y: [2, 3, 4], type: 'bar' },
    ],
    layout: {title: 'Some Data to Hover Over'}
  };

  graph2 = {
    data: [
      { x: [1, 2, 3, 4, 5], y: [1, 4, 9, 4, 1], type: 'scatter' },
      { x: [1, 2, 3, 4, 5], y: [1, 3, 6, 9, 6], type: 'scatter' },
      { x: [1, 2, 3, 4, 5], y: [1, 2, 4, 5, 6], type: 'scatter' },
    ],
    layout: {title: 'Some Data to Highlight'}
  };

  interactivePlotSubject$: Subject<any> = new BehaviorSubject<any>(this.graph2.data);

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
      this.graph.data = this.data;

    } else
      if (this.pMap === 'line') {
        //   this.graph = {
        //     data: [
        //         { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
        //         { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
        //     ],
        //     layout: {width: 520, height: 340, title: 'Sample Plot'}
        // };
        this.data = [
          { x: [1, 2, 3, 4, 5, 6, 7, 8, 9], y: [2, 7, 6, 3], type: 'scatter', mode: 'lines+points', marker: { color: '#6666ff' } },

          { x: [1, 2, 3, 4, 5, 6, 7, 8, 9], y: [4, 12, 6, 9], type: 'scatter', mode: 'lines+points', marker: { color: 'orange' } },

          { x: [1, 2, 3, 4, 5, 6, 7, 8, 9], y: [8, 2, 7, 9], type: 'scatter', mode: 'lines+points', marker: { color: 'green' } },
        ]
        // Plotly.newPlot('myDiv', data);
        this.layOut = {
          width: 520, height: 340, title: 'Line',
          plot_bgcolor: "rgba(0,0,0,0)",
          paper_bgcolor: "rgba(0,0,0,0)",

        }
        this.graph.data = this.data;

      } else {
        this.data = [
          {
            z: [[1, 20, 30], [20, 1, 60], [30, 60, 1],

            [11, 210, 130], [200, 111, 160], [130, 60, 11]
            ],
            type: 'heatmap'
          }
        ];
        this.graph.data = this.data;
        this.layOut = {
          width: 820, height: 390, title: this.pMap,
          plot_bgcolor: "rgba(0,0,0,0)",
          paper_bgcolor: "rgba(0,0,0,0)",
        }

      }
  }
  // We'll bind the hover event from plotly
  hover(event: any): void {
    // The hover event has a lot of information about cursor location.
    // The bar the user is hovering over is in "pointIndex"
    console.log(event)
    this.interactivePlotSubject$.next(
      [this.graph2.data[event.points[0].pointIndex]]
    );
  }
  // Reset to default when hovering stops
  mouseLeave(event: Event): void {
    this.interactivePlotSubject$.next(this.graph2.data);
  }

}
