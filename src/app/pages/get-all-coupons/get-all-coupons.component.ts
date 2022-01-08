import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon.model';
import { User } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-all-coupons',
  templateUrl: './get-all-coupons.component.html',
  styleUrls: ['./get-all-coupons.component.css'],
})
export class GetAllCouponsComponent implements OnInit {
  couponList: Array<Coupon> = [];
  currentUser: User = new User();
  role: string = '';

  ngOnInit(): void {
    this.getAllCoupons();
  }
  constructor(
    private adminService: AdminService,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe((data) => {
      this.currentUser = data;
      //console.log((this.currentUser.roles));
      var iterator = this.currentUser.roles?.values();

      this.role = iterator?.next()?.value['role'];
      console.log(this.role);

      //this.role= data.roles[0].role;
    });
  }

  getAllCoupons() {
    this.userService.getAllCoupons().subscribe(
      (data) => {
        this.couponList = data;
        console.log('hello');

        console.log(this.couponList);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteCoupon(coupon: Coupon) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        
        
        this.adminService.deleteCouponByCode(coupon).subscribe(
          (data) => {
            console.log(data);

            if(data!=null)
            {
              Swal.fire('Deleted!', coupon.code + ' has been deleted.', 'success');
            }
            this.getAllCoupons();

          },
          (err) => {
            Swal.fire('Unexpected error occurred');
            console.log(err);
          }
        );
      }
    });
  }





  isAdmin()
  {
    return this.role ==='ADMIN'
  }
}

// let currentUrl = this.router.url;
//   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
//   this.router.onSameUrlNavigation = 'reload';
//   this.router.navigate([currentUrl]);
