import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Coupon } from '../models/coupon.model';
import { User } from '../models/user.model';
import { AuthenticationService } from './authentication.service';
import { RequestBaseService } from './request-base.service';



const API_URL = `${environment.BASE_URL}/company/company`;
@Injectable({
  providedIn: 'root'
})
export class CompanyService extends RequestBaseService{

  override currentUser: User = new User();
  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
      //console.log((this.currentUser.roles));
      var iterator = this.currentUser.roles?.values();
    });
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete( `${API_URL}/deletebyname/${user.id}`, {headers: this.getHeaders});
  }

  getAllCoupons(): Observable<any> {
    console.log( {headers: this.getHeaders});
    
    return this.http.get( `${API_URL}/getalllist`, {headers: this.getHeaders});
  }

  getCouponsofCompany(company:string):Observable<any>{
    return this.http.get( API_URL+"/coupons/companyid/"+company, {headers: this.getHeaders});
  }

  deleteCouponbyName(coupon: Coupon): Observable<any> {
    return this.http.delete( `${API_URL}/coupons/deletebyname/${coupon.couponname}`, {headers: this.getHeaders});
  }

  deleteCouponByCode(coupon: Coupon): Observable<any> {

    console.log(coupon);
    
    return this.http.delete( `${API_URL}/coupons/deletebyid/${coupon.code}` , {headers: this.getHeaders});
  }

  addCoupon(coupon:Coupon)
  {
    return this.http.post(API_URL+"/coupons/addcoupon",coupon, {headers: this.getHeaders});
  }

  updateCoupon(coupon:Coupon)
  {
    return this.http.put(API_URL+"/coupons/updatecouponbycouponname/"+coupon.code,coupon, {headers: this.getHeaders});
  }
  
}
