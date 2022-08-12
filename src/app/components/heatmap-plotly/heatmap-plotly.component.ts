import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';
import { Config, Data, Layout } from 'plotly.js';

import { Mainclass } from '../../mainclass';
import * as moment from 'moment';
@Component({
  selector: 'app-heatmap-plotly',
  templateUrl: './heatmap-plotly.component.html',
  styleUrls: ['./heatmap-plotly.component.scss']
})
export class HeatmapPlotlyComponent implements OnInit, OnChanges {
  graph: any = { data: [],layout:{} };
  @Input('pMap') pMap: any;
  @Input() xAxis: any = [];
  @Input() yAxis: any = [];
  @Input() zAxis: any = [];
  chartHeight = 320;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)
    const arr = new Mainclass();

    const yAxis=this.yAxis.map((d:any)=>moment(new Date(d)).format("yyyy-MM-dd"));
    // console.log(yAxis)
    const uniqYaxis=[...new Set(yAxis)].map((d:any)=>d);
   

    let zarr: any = []
    this.zAxis.forEach((ele: any) => {
      let arr = ele.dateOccurance.map((times: any) => {
        return times.occurance;
      })
      zarr.push(arr)
    })
    // console.log(zarr)

// console.log('tags wih occourance',  this.zAxis)
    
    let data = [
      {
        x: this.xAxis,
        y: uniqYaxis,
        z: zarr,
        type: 'heatmap',
        // colorscale:[[0, 'whitesmoke'], [0.33, 'limegreen'], [0.67, 'tomato'], [1, 'teal']]
        // colorscale: [[1, 'whitesmoke'], [3, 'limegreen'], [6, '#674ea7'], [12, 'red']],
        // colorscale: [
        //   ['0.0', 'rgb(165,0,38)'],
        //   ['0.111111111111', 'rgb(215,48,39)'],
        //   ['0.222222222222', 'rgb(244,109,67)'],
        //   ['0.333333333333', 'rgb(253,174,97)'],
        //   ['0.444444444444', 'rgb(254,224,144)'],
        //   ['0.555555555556', 'rgb(224,243,248)'],
        //   ['0.666666666667', 'rgb(171,217,233)'],
        //   ['0.777777777778', 'rgb(116,173,209)'],
        //   ['0.888888888889', 'rgb(69,117,180)'],
        //   ['1.0', 'rgb(49,54,149)']
        // ],
        colorscale: [[0, 'rgb(166,206,227)'], [0.25, 'rgb(31,120,180)'], [0.45, 'rgb(178,223,138)'], [0.65, 'rgb(51,160,44)'], [0.85, 'rgb(251,154,153)'], [1, 'rgb(227,26,28)']],
        xgap: 1, ygap: 1, opacity: 1,
        showscale: true, zsmooth: true,
        //  hoverinfo: "text", 
      }
    ];
    // console.log(data[0].y)
    // console.log(data[0].z)
    this.graph.data = data;
    // this.graph.layout.height = this.chartHeight;
    this.graph.layout.title = 'Trend Analysis';
    this.graph.layout.font= {
      family: 'Roboto',
      // size: 14,
      color: '#7f7f7f'
    }

    

    // let layOut = {
    //   width: 820, height: 390, title: 'heat map',
    //   plot_bgcolor: "rgba(0,0,0,0)",
    //   paper_bgcolor: "rgba(0,0,0,0)",
    // }


  }


}
