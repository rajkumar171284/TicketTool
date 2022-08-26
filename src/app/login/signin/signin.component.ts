import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms'
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  logForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.logForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  logIn() {

    let logged;
    // console.log(this.logForm.valid)
    if (this.logForm.valid) {
      logged = 'true';
      // this.router.navigate(['home/dashboard']);//after mapping Auth api success

    } else {
      logged = 'false';
      sessionStorage.removeItem('session')
      sessionStorage.clear();

    }


  }

  navigate() {
    const session = { name: 'Guest' };
    sessionStorage.setItem('session', JSON.stringify(session));
    this.router.navigate(['home/dashboard']);
  }

}
