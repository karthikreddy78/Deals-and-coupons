import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdduserComponent } from './pages/admin/adduser/adduser.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminWelcomeComponent } from './pages/admin/admin-welcome/admin-welcome.component';
import { DeleteuserComponent } from './pages/admin/deleteuser/deleteuser.component';
import { GetallusersComponent } from './pages/admin/getallusers/getallusers.component';
import { GetusersonroleComponent } from './pages/admin/getusersonrole/getusersonrole.component';
import { AddcouponComponent } from './pages/company/addcoupon/addcoupon.component';
import { CompanyCouponsComponent } from './pages/company/company-coupons/company-coupons.component';
import { CompanyDashboardComponent } from './pages/company/company-dashboard/company-dashboard.component';
import { CompanySidebarComponent } from './pages/company/company-sidebar/company-sidebar.component';
import { CompanyWelcomeComponent } from './pages/company/company-welcome/company-welcome.component';
import { NotAuthorisedComponent } from './pages/errors/not-authorised/not-authorised.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { GetAllCouponsComponent } from './pages/get-all-coupons/get-all-coupons.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'signup', pathMatch: 'full', component: RegisterComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN"] },
    children:[
      {path:'',component:AdminWelcomeComponent},
      {path:'home',component:HomeComponent},
      {path:'profile',component:ProfileComponent},
      { path: "getallusers", component: GetallusersComponent},
      {path:'getusersonrole',component: GetusersonroleComponent},
      {path:'adduser',component:AdduserComponent},
      {path:'deleteuser',component:DeleteuserComponent},
      {path:'allcoupons',component:GetAllCouponsComponent}
    ]
  },
  {
    path: 'company',
    component: CompanyDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ["COMPANY"]},
    children:
    [
      {path:'',component:CompanyWelcomeComponent},
      {path:'home',component:HomeComponent},
      {path:'profile',component:ProfileComponent},
      {path:'addcoupon',component:AddcouponComponent},
      {path:'companycoupons',component:CompanyCouponsComponent},
      {path:'allcoupons',component:GetAllCouponsComponent}
    ]
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ["USER"] },
    children:[
      {path:'',component:HomeComponent},
      {path:'profile',component:ProfileComponent},
      {path:'allcoupons',component:GetAllCouponsComponent}
      
    ]

  },
  // {
  //     path: 'allcoupons',component:GetAllCouponsComponent,
  //     canActivate: [AuthGuard],
  //     data: { roles:["ADMIN","USER","COMPANY"]}
  // },
  { path: '401', component: NotAuthorisedComponent },
  { path: '404', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private route: Router) {
    this.route.errorHandler = (error: any) => {
      console.log(error);
      
      this.route.navigate(['/404'])
    }
  }
}
