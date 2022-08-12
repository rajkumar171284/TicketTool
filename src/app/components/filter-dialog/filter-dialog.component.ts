import { Component, EventEmitter, Input, Output, OnInit, Inject, Optional, OnChanges, SimpleChanges } from '@angular/core';
// import {MatDialog} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { from, of, startWith } from 'rxjs';

export interface filteredData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'], providers: [FormBuilder]
})
export class FilterDialogComponent implements OnInit, OnChanges {

  newForm: FormGroup = this.fb.group({
    START_DATE: '',
    END_DATE: '',
    heatMapFilterBy: ''
  });
  @Input() widget!: any;
  @Input() startDate: any;
  @Input() endDate: any;
  // @Input() pattern: any;

  @Output() _getFilter = new EventEmitter();
  @Output() _priorityFilter = new EventEmitter();
  @Output() _TrendFilter = new EventEmitter();
  toppingList: string[] = ['January',
    'February',
    'March',
    'April',
    'May',
    'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  hide1 = false;
  FilterBy: any = [];
  constructor(//@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
    
    // console.log(this.FilterBy)

  }

  ngOnInit(): void {
    // console.log(this.data)
    this.FilterBy = ['day', 'week', 'month'].map(res=>{
      return {
        key: res.toUpperCase()
      }
    });
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.startDate, this.endDate)
    if (this.widget == 'tags') {
      this.newForm = this.fb.group({
        START_DATE: [new Date(), Validators.required],
        END_DATE: [new Date(this.endDate), Validators.required],
      })
    } else if (this.widget == 'heat') {
      this.newForm = this.fb.group({
        START_DATE: [new Date(this.startDate), Validators.required],
        END_DATE: [new Date(this.endDate), Validators.required],
        heatMapFilterBy: ''
      })
    }
  }
  cancel() {
    // closing itself and sending data to parent component
    // this.dialogRef.close({ data: this.toppingList })
  }
  get VALUE() {
    return this.newForm.value;
  }

  onConfirmClick(): void {
    console.log(this.widget)

    if (this.newForm.valid) {

      console.log(this.VALUE)
      // this.dialogRef.close({ data: this.myForm.controls['toppings'].value })


      if (this.widget == 'priority') {

        this._priorityFilter.emit(this.VALUE)
      } else if (this.widget == 'tags') {
        this._getFilter.emit(this.VALUE)
      }else if(this.widget=='heat-trend'){
        this._TrendFilter.emit(this.VALUE)
      }
    }


    // return
    // else
    // 
  }


}
