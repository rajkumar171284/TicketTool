import { AfterViewInit, ElementRef, Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
// import { Chart } from 'chart.js';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.scss']
})
export class ChartjsComponent implements AfterViewInit, OnChanges {
  @ViewChild('myChart') myChart: any;
  @Input() chartType: any;
  @Input() monthsData: any = [];
  @Input() monthsData2: any = [];
  canvas: any;
  myChartele: any;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (this.chartType == 'chart1') {
      this.chart1()
    }
    if (this.chartType == 'chart2') {
      this.chart2()
    }

  }
  ngOnInit(): void {
    console.log(this.chartType)
  }
  ngAfterViewInit() {
    if (this.chartType == 'chart1') {
      this.chart1()
    }
    if (this.chartType == 'chart2') {
      this.chart2()
    }


  }
  chart2() {
    this.canvas = this.myChart.nativeElement;

    const ctx = this.canvas.getContext('2d');
    const labels = this.monthsData2;


    const data = {
      labels: labels,
      datasets: [{
        label: 'label1',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
      }]
    };

    let config: any = {
      type: 'line',
      data: data,
      options: {}
    };
    if (this.myChartele) {
      this.myChartele.destroy();
    }
    this.myChartele = new Chart(ctx, config);
  }
  chart1() {
    this.canvas = this.myChart.nativeElement;

    const ctx = this.canvas.getContext('2d');
    const labels = this.monthsData;



    const data = {
      labels: labels,
      datasets: [{
        label: 'sample',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };

    let config: any = {
      type: 'bar',
      data: data,
      options: {}
    };
    if (this.myChartele) {
      this.myChartele.destroy();
    }


    this.myChartele = new Chart(ctx, config);
  }
  loadChart() {
    this.canvas = this.myChart.nativeElement;

    const ctx = this.canvas.getContext('2d');
    if (this.myChartele) {
      this.myChartele.destroy();
    }



    this.myChartele = new Chart(ctx, {
      type: 'line',

      data: {
        datasets: [{
          label: 'line',
          backgroundColor: "rgba(255, 99, 132,0.4)",
          borderColor: "rgb(255, 99, 132)",
          fill: true,
          data: [
            { x: 1, y: 12 },
            { x: 2500, y: 32.5 },
            { x: 3000, y: 45 },
            { x: 3400, y: 4.75 },
            { x: 3600, y: 4.75 },
            { x: 5200, y: 46 },
            { x: 6000, y: 9 },
            { x: 7100, y: 6 },
          ],
        }]
      },
      options: {
        responsive: true,

      }
    });


  }

}
