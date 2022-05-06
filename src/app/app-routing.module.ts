import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ControlsComponent } from './components/controls/controls.component';

const newLocal = "login";
const routes: Routes = [


  {
    path: "", pathMatch: "full", redirectTo: 'login'
  },
  {
    path: newLocal, loadChildren: () => import('./login/login.module').then(
      module => module.LoginModule
    )
  },
  {
    path: "dashboard", component: DashboardComponent
  },
  {
    path: "admin", component: ControlsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
