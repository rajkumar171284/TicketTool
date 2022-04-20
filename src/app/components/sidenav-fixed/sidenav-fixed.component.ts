import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sidenav-fixed',
  templateUrl: './sidenav-fixed.component.html',
  styleUrls: ['./sidenav-fixed.component.scss']
})
export class SidenavFixedComponent implements OnInit {
  options: FormGroup;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      bottom: 0,
      fixed: true,
      top: 0,
    });
  }

  shouldRun =true;

  ngOnInit(): void {
  }

}
