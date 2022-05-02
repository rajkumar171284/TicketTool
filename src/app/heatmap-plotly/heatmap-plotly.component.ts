import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';
import { Config, Data, Layout } from 'plotly.js';
@Component({
  selector: 'app-heatmap-plotly',
  templateUrl: './heatmap-plotly.component.html',
  styleUrls: ['./heatmap-plotly.component.scss']
})
export class HeatmapPlotlyComponent implements OnInit,OnChanges {
  graph :any={data:[]};
  @Input('pMap') pMap: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)

        let data = [
          {
            x:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                y:['Morning', 'Afternoon', 'Evening'],
            z: [[.1, .3, .5, .7, .9],
            [1, .8, .6, .4, .2],
            [.2, 0, .5, .7, .9],
            [.9, .8, .4, .2, 0],
            [.3, .4, .5, .7, 1]],
            type: 'heatmap',
            // colorscale:[[0, 'whitesmoke'], [0.33, 'limegreen'], [0.67, 'tomato'], [1, 'teal']]
            colorscale: [[0, '#b0e0e6'], [0.33, '#3399ff'], [0.67, '#674ea7'], [1, '#16e4ff']], 
            xgap:1, ygap:1, opacity : 1,
             showscale:true, zsmooth:false,
              //  hoverinfo: "text", 
          }
        ];
        this.graph.data = data;
        let layOut = {
          width: 820, height: 390, title: 'heat map',
          plot_bgcolor: "rgba(0,0,0,0)",
          paper_bgcolor: "rgba(0,0,0,0)",
        }


      }
  

}
