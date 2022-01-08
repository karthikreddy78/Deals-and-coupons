import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { AuthenticationService } from './authentication.service';
import { RequestBaseService } from './request-base.service';

const API_URL = `${environment.BASE_URL}/users/users`;
@Injectable({
  providedIn: 'root'
})
export class UserService extends RequestBaseService {

  override currentUser: User = new User();
  constructor(authenticationService: AuthenticationService, http: HttpClient,private router: Router) {
    super(authenticationService, http);
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
      //console.log((this.currentUser.roles));
      var iterator = this.currentUser.roles?.values();
    });
  }


  getAllCoupons(): Observable<any> {
    //console.log( {headers: this.getHeaders});
    
    return this.http.get( `${API_URL}/coupons/couponslist`, {headers: this.getHeaders});
  }
}
