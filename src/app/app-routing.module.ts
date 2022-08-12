import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UploadComponent } from './components/upload/upload.component';


import { AuthGuard } from './login/auth.guard';
const newLocal = "login";
const routes: Routes = [
  {
    path: "", pathMatch: "full", redirectTo: 'login'
  },
  {
    path: newLocal, loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
  },
  {
    path:'home',
    loadChildren:()=>import ('./start-up/start-up.module').then(module=>module.StartUpModule)
  },
  // {
  //   path: 'ticketing',
  //   children: [
  //     {

  //     },
  //   ]
  // },
  {
    path:"Ticket-tool2",loadChildren:()=> import('./sidenav/sidenav.module').then(module=>module.SidenavModule)
  },
  {
    canActivate: [AuthGuard],
    path: "dashboard2", component: DashboardComponent
  },

  // {
  //   canActivate: [AuthGuard],
  //   path: "dashboard", component: ControlsComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
