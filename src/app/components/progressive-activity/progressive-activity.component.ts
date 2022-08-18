import { Component, AfterViewInit, DoCheck, ViewChild, ElementRef, ViewContainerRef, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

// import { widgetResponse } from '../../myclass';

declare let $: any;
@Component({
  selector: 'app-progressive-activity',
  templateUrl: './progressive-activity.component.html',
  styleUrls: ['./progressive-activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressiveActivityComponent implements OnInit, OnChanges {
  @Input() WIDGET_REQUEST: any;
  @Input() ASSET_CONFIG_ID: any;
  @Output() _widgetData = new EventEmitter();
  loading = true;
  @Input() totalCategory!: any;
  @Input() newLabel!: any;
  @Input() loader!: boolean;
  // widgetResponse: any = new widgetResponse()
  errMessage: string = '';
  isDataFound: boolean = false;
  dataSource: any = [];
  displayedColumns: string[] = [
    "key", "totalValue"]
  public height: any;
  public width: any;
  constructor( private ref: ChangeDetectorRef) { }
  // @ViewChild("table2") divBoard!: ElementRef;
  // divElement!: any;

  ngAfterViewInit(): void {
    // this.divElement = this.divBoard.nativeElement;
  }
  ngOnInit(): void {


  }
  ngDoCheck(): void {

    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.WIDGET_REQUEST)
    this.getAlldata();
  }
  saveWidget() {

    this._widgetData.emit(this.WIDGET_REQUEST)
  }
  getAlldata() {

    this.loading=false;
    
  }

  

  getLoader(data: boolean) {
    this.loading = data;
  }
  
}
