import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';
import { Config, Data, Layout } from 'plotly.js';
import { Subject, BehaviorSubject } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

const colors = ["(255,165,0)", "(255,105,180)", "(124,252,0)", "(0,128,0)", "(100,149,237)", "(64,224,208)", "(0,255,127)",
  "(138,43,226)", "(153,50,204)", "(255,105,180)", "(0,191,255)", "(255,105,180)", "(210,105,30)", "(148,0,211)", "(65,105,225)", "(100,149,237)", "(255,105,180)", "(72,209,204)", "(0,128,128)"]

const colors2 = ['#CDDC39', '#6666FF', '#F44336', '#00BCD4'];
// ['#607D8B','#673AB7','#ff3eeb','#5cca33',
//           '#123abc','#ffe800','#108b10','#778afd','#482b7d','#81e7e1']

@Component({
  selector: 'app-plotly',
  templateUrl: './plotly.component.html',
  styleUrls: ['./plotly.component.scss']
})
export class PlotlyComponent implements OnInit, OnChanges {
  @Input('pMap') pMap: any;
  @Input() totalCategory!: any;
  @Input() newLabel!: any;
  @Input() loader!: boolean;

  @Input() Priority!: any;

  public data: any;
  public layOut: any;
  chartWidth = 520;
  chartHeight = 320;
  graph = {
    data: [],
    layout: { width: 520, height: 340, title: 'Sample Plot' },
    pointIndex: 1
  };

  graph1: any = {
    data: [
      { x: [1, 2, 3], y: [2, 3, 4], type: 'bar' },
    ],
    layout: {
      title: this.newLabel,
      font: {
        family: 'Roboto',
        // size: 14,
        color: '#7f7f7f'
      }
    }
  };

  graph2: any = {
    data: [
      { x: [1, 2, 3, 4, 5], y: [1, 4, 9, 4, 1], type: 'scatter' },
      { x: [1, 2, 3, 4, 5], y: [1, 3, 6, 9, 6], type: 'scatter' },
      { x: [1, 2, 3, 4, 5], y: [1, 2, 4, 5, 6], type: 'scatter' },
    ],
    layout: { title: 'Some Data to Highlight' }
  };
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  interactivePlotSubject$: Subject<any> = new BehaviorSubject<any>(this.graph2.data);


  opacity: number = 0.7;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, this.loader)

    if (this.pMap === 'tag-Bar') {
      // console.log(this.totalCategory)
      this.data = [
        {
          x: this.totalCategory.map((z: any) => z.Tag),
          y: this.totalCategory.map((z: any) => z.count),
          type: 'bar',
          opacity: this.opacity,
          // name:[]
          //  marker: { color: '#000000' },
          marker: {
            color: ['#CDDC39', '#6666FF', '#F44336', '#00BCD4', '#607D8B', '#673AB7', '#ff3eeb', '#5cca33',
              '#123abc', '#ffe800', '#108b10', '#778afd', '#482b7d', '#81e7e1']
          }
          //  backgroundColor: 'red' 
        }


      ]

      // this.layOut = {
      //   width: 520, height: 340, title: 'Bar chart',
      //   plot_bgcolor: "rgba(0,0,0,0)",
      //   paper_bgcolor: "rgba(0,0,0,0)",


      // }
      this.graph1.data = this.data;
      this.graph1.layout.title = this.newLabel;
      this.graph1.layout.showlegend = false;
      this.graph1.layout.height = this.chartHeight;

      this.graph1.layout.margin = {
        l: 50,
        r: 50,
        b: 100,
        t: 50,
        pad: 4
      }
      this.loader = false;

    } else if (this.pMap === 'pie') {

      this.donutChart(this.totalCategory);
      // this.pieChart(this.totalCategory);

    } else if (this.Priority && this.pMap == 'bar') {
      this.barChart(this.Priority)
    }
  }

  barChart(result: any) {
    // priority
    // console.log('priority',result)

    let data: any = [];

    const dummy = [{ key: '3-Low', count: 60 },
    { key: '2-Low', count: 102 },
    { key: '1-Low', count: 30 }
    ]

    const newResult = result.concat(...dummy);
    data = [
      {
        x: newResult.map((z: any) => z.key),
        y: newResult.map((z: any) => z.count),
        type: 'bar',
        name: ['wew', 'wewe', 'ewewew', 'dsds'],
        marker: {
          opacity: this.opacity,
          color: ['#CDDC39', '#6666FF', '#F44336', '#00BCD4', '#607D8B', '#673AB7', '#ff3eeb', '#5cca33',
            '#123abc', '#ffe800', '#108b10', '#778afd', '#482b7d', '#81e7e1']
        }
        //  backgroundColor: 'red' 
      }
    ]
    this.graph1.data = data;
    // this.graph1.layout.width = this.chartWidth;
    this.graph1.layout.height = this.chartHeight;
    this.graph1.layout.showlegend = false;
    this.graph1.responsive = true;
    this.graph1.layout.margin = {
      l: 50,
      r: 50,
      b: 100,
      t: 50,
      pad: 4
    }
    this.graph1.layout.title = this.newLabel;
    // console.log(this.graph1)

  }


  donutChart(result: any) {
    result = result.map((z: any) => {
      z.avg = Math.round(z.hours / z.count);
      return z;
    });
    let data: any = [];
    let valArray: any = [];
    for (let a of result) {
      valArray.push(a.avg);

      const item = {
        values: valArray,
        labels: result.map((z: any) => z.Tag),
        domain: { column: 0 },
        name: 'TAG',
        hoverinfo: 'label+percent+name',
        hole: .4,
        type: 'pie'
      }
      data.push(item);
    }
    this.graph1.data = data;
    // this.graph1.layout.width = this.chartWidth;
    this.graph1.layout.height = 400;
    // this.graph1.layout.title = this.newLabel;
  }

  donutChart2(result: any) {
    result = result.map((z: any) => {
      z.avg = Math.round(z.hours / z.count);
      return z;
    });
    var xArray = result.map((z: any) => z.Tag);
    var yArray = result.map((z: any) => z.avg);


    this.data = [{
      labels: xArray, values: yArray, hole: .4, type: "pie",
      // textposition:'values',
      // hoverinfo: 'label',
    }];
    this.graph1.data = this.data;
    // this.graph1.layout.width = this.chartWidth;
    this.graph1.layout.height = 400;
    this.graph1.layout.title = this.newLabel;
  }

  pieChart(result: any) {
    result = result.map((z: any) => {
      z.avg = (z.hours / z.count);
      return z;
    });

    var traceA = {
      type: "pie",
      values: result.map((z: any) => z.avg),
      labels: result.map((z: any) => z.Tag),
      hole: 0.25,
      pull: [0.1, 0, 0, 0, 0],
      direction: 'clockwise',
      marker: {
        colors: ['#CDDC39', '#673AB7', '#F44336', '#00BCD4', '#607D8B'],
        line: {
          color: 'black',
          width: 1
        }
      },
      textfont: {
        family: 'Lato',
        color: 'white',
        size: 14
      },
      hoverlabel: {
        bgcolor: 'black',
        bordercolor: 'black',
        font: {
          family: 'Lato',
          color: 'white',
          size: 14
        }
      }
    };

    this.data = [traceA];
    // console.log('pip',this.data)
    this.graph1.data = this.data;
    // this.graph1.layout.width = this.chartWidth;
    this.graph1.layout.height = 400;
    this.graph1.layout.title = this.newLabel;

  }
  // We'll bind the hover event from plotly
  hover(event: any): void {
    // The hover event has a lot of information about cursor location.
    // The bar the user is hovering over is in "pointIndex"
    // console.log(event)
    // this.interactivePlotSubject$.next(
    //   [this.graph2.data[event.points[0].pointIndex]]
    // );
  }
  // Reset to default when hovering stops
  mouseLeave(event: Event): void {
    // this.interactivePlotSubject$.next(this.graph2.data);
  }

}
