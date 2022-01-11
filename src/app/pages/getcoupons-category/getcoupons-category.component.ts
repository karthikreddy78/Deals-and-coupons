import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CouponLatest } from 'src/app/models/coupon-latest.model';
import { User } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-getcoupons-category',
  templateUrl: './getcoupons-category.component.html',
  styleUrls: ['./getcoupons-category.component.css']
})
export class GetcouponsCategoryComponent implements OnInit {
  id: any;
  couponList: Array<CouponLatest> = [];
  currentUser: User = new User();
  role: string = '';

  constructor(private router: ActivatedRoute, private userService: UserService, private authenticationService: AuthenticationService,private adminService: AdminService) {

    this.router.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')
      console.log(this.id);
      this.getCouponsCategory();
     
    })

    this.authenticationService.currentUser.subscribe((data) => {
      this.currentUser = data;
      //console.log((this.currentUser.roles));
      var iterator = this.currentUser.roles?.values();

      this.role = iterator?.next()?.value['role'];
      console.log(this.role);

      //this.role= data.roles[0].role;
    });

  }

  ngOnInit(): void {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id')
    })
    console.log(this.id);

    this.userService.getCouponCategory(this.id).subscribe(data => {
      console.log(data);

    })


  }

  isAdmin() {
    return this.role === 'ADMIN'
  }

  isUser() {
    return this.role === 'USER'
  }

  goToLink(url: string) {
    if (url.substring(0, 5) !== "https") {
      window.open("https://" + url, "_blank");
    }
    else {
      window.open(url, "_blank");
    }

  }


  deleteCoupon(coupon: CouponLatest) {
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

            if (data != null) {
              Swal.fire('Deleted!', coupon.code + ' has been deleted.', 'success');
            }
            this.getCouponsCategory()

          },
          (err) => {
            Swal.fire('Unexpected error occurred');
            console.log(err);
          }
        );
      }
    });
  }

  getCouponsCategory()
  {
    this.userService.getCouponCategory(this.id).subscribe(data => {
      console.log(data);
      this.couponList=data
      this.couponList.forEach((c: { image: string; }) => {
        c.image= 'data:image/jpeg;base64,'+ c.image
        
      });

    })
  }



  


}
