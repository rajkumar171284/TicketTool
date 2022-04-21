import { Component, OnInit,Inject, Optional  } from '@angular/core';
// import {MatDialog} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl,FormBuilder, Validators} from '@angular/forms';

export interface filteredData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],providers:[FormBuilder]
})
export class FilterDialogComponent implements OnInit {
  myForm =this.fb.group({
    toppings :['',Validators.required]
  })

  toppingList: string[] = ['January',
  'February',
  'March',
  'April',
  'May',
  'June','July','Aug','Sep','Oct','Nov','Dec'];

  constructor(public dialogRef: MatDialogRef<FilterDialogComponent>,//@Optional() is used to prevent error if no data is passed
  @Optional() @Inject(MAT_DIALOG_DATA) public data: filteredData,private fb:FormBuilder
    ) { }

  ngOnInit(): void {

  }
  cancel() {
    // closing itself and sending data to parent component
    this.dialogRef.close({ data: this.toppingList })
  }

  onConfirmClick(): void {
    
    
    if(this.myForm.valid){
      // console.log(this.myForm)
      this.dialogRef.close({ data: this.myForm.controls['toppings'].value })
    }
    // return
    // else
    // 
}


}
