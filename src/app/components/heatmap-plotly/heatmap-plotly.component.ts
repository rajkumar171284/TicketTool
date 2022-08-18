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
  @Input()optionName:any;
  chartHeight = 320;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)

    const yAxis=this.yAxis.map((d:any)=>moment(new Date(d)).format("yyyy-MM-DD"));
    // console.log(yAxis)

    const sorted=yAxis.sort(function(a:any, b:any){
      let date1:any = new Date(a)
      let date2:any = new Date(b)
      
      return date1 - date2;
  })
   
    const uniqYaxis=[...new Set(sorted)].map((d:any)=>d);
   
    console.log(uniqYaxis)
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
        
        colorscale: [[0, 'rgb(166,206,227)'], [0.25, 'rgb(31,120,180)'], [0.45, 'rgb(178,223,138)'], [0.65, 'rgb(51,160,44)'], [0.85, 'rgb(251,154,153)'], [1, 'rgb(227,26,28)']],
        xgap: 1, ygap: 1, opacity: 1,
        showscale: true, zsmooth: true,
        //  hoverinfo: "text", 
      }
    ];
    console.log(data)
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
