import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavFixedComponent } from '../start-up/sidenav-fixed/sidenav-fixed.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AuthGuard } from '../login/auth.guard';
import { UploadComponent } from '../components/upload/upload.component';

const routes: Routes = [
  {
    path: '',
    component: SidenavFixedComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'upload',
        component: UploadComponent
      }
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartUpRoutingModule { }
