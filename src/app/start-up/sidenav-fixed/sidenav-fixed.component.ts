import { Component, OnInit,Input,OnChanges, SimpleChanges } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import{Router}from '@angular/router';
@Component({
  selector: 'app-sidenav-fixed',
  templateUrl: './sidenav-fixed.component.html',
  styleUrls: ['./sidenav-fixed.component.scss']
})
export class SidenavFixedComponent implements OnInit,OnChanges {
  @Input('isSession') isSession:boolean | undefined;
  options: FormGroup;

  constructor(fb: FormBuilder,private router:Router) {
    this.options = fb.group({
      bottom: 0,
      fixed: true,
      top: 0,
    });
  }


  ngOnInit(): void {
  }
 ngOnChanges(changes: SimpleChanges): void {
     console.log(changes,this.isSession)
 }
 logOut(){
sessionStorage.clear();
this.router.navigate(['login'])
 }
}
