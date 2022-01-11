import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { CompanyDashboardComponent } from './pages/company/company-dashboard/company-dashboard.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { NotAuthorisedComponent } from './pages/errors/not-authorised/not-authorised.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { AdminWelcomeComponent } from './pages/admin/admin-welcome/admin-welcome.component';
import { GetallusersComponent } from './pages/admin/getallusers/getallusers.component';
import { GetusersonroleComponent } from './pages/admin/getusersonrole/getusersonrole.component';
import { AdduserComponent } from './pages/admin/adduser/adduser.component';
import { DeleteuserComponent } from './pages/admin/deleteuser/deleteuser.component';
import { AddcouponComponent } from './pages/company/addcoupon/addcoupon.component';
import { CompanySidebarComponent } from './pages/company/company-sidebar/company-sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CompanyWelcomeComponent } from './pages/company/company-welcome/company-welcome.component';
import { CompanyCouponsComponent } from './pages/company/company-coupons/company-coupons.component';
import { GetAllCouponsComponent } from './pages/get-all-coupons/get-all-coupons.component';
import { UpdateCouponComponent } from './pages/company/update-coupon/update-coupon.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { UserSidebarComponent } from './pages/user/user-sidebar/user-sidebar.component';
import { GetcouponsCategoryComponent } from './pages/getcoupons-category/getcoupons-category.component';
import { UpdateprofileComponent } from './pages/updateprofile/updateprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    CompanyDashboardComponent,
    NotFoundComponent,
    NotAuthorisedComponent,
    ProfileComponent,
    SidebarComponent,
    AdminWelcomeComponent,
    GetallusersComponent,
    GetusersonroleComponent,
    AdduserComponent,
    DeleteuserComponent,
    AddcouponComponent,
    CompanySidebarComponent,
    CompanyWelcomeComponent,
    CompanyCouponsComponent,
    GetAllCouponsComponent,
    UpdateCouponComponent,
    AboutusComponent,
    UserSidebarComponent,
    GetcouponsCategoryComponent,
    UpdateprofileComponent
  ],
  entryComponents:[UpdateCouponComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    LayoutModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
