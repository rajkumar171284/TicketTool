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
  graph: any = { data: [] };
  @Input('pMap') pMap: any;
  @Input() xAxis: any = [];
  @Input() yAxis: any = [];
  @Input() zAxis: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)
    const arr = new Mainclass();

    const yAxis=this.yAxis.map((d:any)=>moment(new Date(d)).format("yyyy-MM-dd"));
    // console.log(yAxis)
    const uniqYaxis=[...new Set(yAxis)].map((d:any)=>d);
    // const uniqdates= uniqYaxis.map((ele:any)=>{      
    //   // console.log(ele)      
    //   return new Date(ele)

    //   // return moment(ele).format("DD-MM-YYYY HH:mm:ss")
    // })
    // const uniqYaxis=[...new Set(this.yAxis)].map((d:any)=>new Date(d));

// console.log(uniqYaxis)

    // const val = Object.values(all_dates).map((z: any) => moment(z).format("DD-MM-YYYY"));
    // console.log(this.yAxis)

    let zarr: any = []
    this.zAxis.forEach((ele: any) => {
      let arr = ele.dateOccurance.map((times: any) => {
        return times.occurance;
      })
      zarr.push(arr)
    })
    // console.log(zarr)

console.log('tags wih occourance',  this.zAxis)
    
    let data = [
      {
        x: this.xAxis,
        y: uniqYaxis,
        z: zarr,
        type: 'heatmap',
        // colorscale:[[0, 'whitesmoke'], [0.33, 'limegreen'], [0.67, 'tomato'], [1, 'teal']]
        colorscale: [[1, 'whitesmoke'], [3, 'limegreen'], [6, '#674ea7'], [12, 'red']],
        xgap: 1, ygap: 1, opacity: 1,
        showscale: true, zsmooth: false,
        //  hoverinfo: "text", 
      }
    ];
    // console.log(data[0].y)
    // console.log(data[0].z)
    this.graph.data = data;
    let layOut = {
      width: 820, height: 390, title: 'heat map',
      plot_bgcolor: "rgba(0,0,0,0)",
      paper_bgcolor: "rgba(0,0,0,0)",
    }


  }


}
