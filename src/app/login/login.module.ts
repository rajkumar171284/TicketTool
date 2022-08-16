import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import {LoginRoutingModule} from './login/login-routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SigninComponent
  ],
  imports: [
    CommonModule,LoginRoutingModule,MaterialModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class LoginModule { }
