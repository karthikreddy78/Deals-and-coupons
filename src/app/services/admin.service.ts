import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Coupon } from '../models/coupon.model';
import { User } from '../models/user.model';
import { AuthenticationService } from './authentication.service';
import { RequestBaseService } from './request-base.service';


const API_URL = `${environment.BASE_URL}/admin/admin`;
@Injectable({
  providedIn: 'root'
})
export class AdminService extends RequestBaseService{

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }
  // saveUser(user: User): Observable<any> {
  //   return this.http.post(API_URL,user, {headers: this.getHeaders});
  //
  // }

  deleteUser(user: User): Observable<any> {
    return this.http.delete( `${API_URL}/deletebyname/${user.id}`, {headers: this.getHeaders});
  }

  getAllUsers(): Observable<any> {
    console.log( {headers: this.getHeaders});
    
    return this.http.get( `${API_URL}/getalllist`, {headers: this.getHeaders});
  }

  getUsersonRole(role:string):Observable<any>{
    return this.http.get( API_URL+"/list/"+role, {headers: this.getHeaders});
  }

  addUser(user:User):Observable<any>
  {
    return this.http.post(API_URL+"/adduser",user, {headers: this.getHeaders});
  }

  deleteCouponByCode(coupon: Coupon): Observable<any> {

    console.log(coupon);
    
    return this.http.delete( `${API_URL}/coupons/deletebyid/${coupon.code}` , {headers: this.getHeaders});
  }

  
}