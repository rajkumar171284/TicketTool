import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import {LoginRoutingModule} from '../login/login/login-routing.module';


@NgModule({
  declarations: [
    SigninComponent
  ],
  imports: [
    CommonModule,LoginRoutingModule
  ]
})
export class LoginModule { }
