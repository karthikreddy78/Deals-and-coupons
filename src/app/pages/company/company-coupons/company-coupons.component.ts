import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { Coupon } from 'src/app/models/coupon.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UpdateCouponComponent } from '../update-coupon/update-coupon.component';
import { CouponLatest } from 'src/app/models/coupon-latest.model';

@Component({
  selector: 'app-company-coupons',
  templateUrl: './company-coupons.component.html',
  styleUrls: ['./company-coupons.component.css']
})
export class CompanyCouponsComponent implements OnInit {

  faUser = faUserCircle;
  couponList: Array<CouponLatest> = []
  currentUser: User = new User;
  role:string="";


  ngOnInit(): void {
    this.getCompanyCoupons()
  }
  constructor(private companyService: CompanyService, private router: Router,
    private authenticationService: AuthenticationService,
    private dialog:MatDialog
    ) 
    { 
      this.authenticationService.currentUser.subscribe(data => {
        this.currentUser = data;
        //console.log((this.currentUser.roles));
        var iterator = this.currentUser.roles?.values();
       
        
          this.role=iterator?.next()?.value['role']
        console.log(this.role);
        
        //this.role= data.roles[0].role;
      });
    }

 

  getCompanyCoupons()
  {
    this.companyService.getCouponsofCompany(this.currentUser.id).subscribe(data => {
      this.couponList = data
      this.couponList.forEach((c: { image: string; }) => {
        c.image= 'data:image/jpeg;base64,'+ c.image
        
      });
      console.log("hello");
      
      console.log(this.couponList);
      
    }, err => {
      console.log(err);
    })
  }

  deleteCoupon(coupon: CouponLatest) {


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire(
          'Deleted!',
          coupon.code+' has been deleted.',
          'success'
        )
        this.companyService.deleteCouponByCode(coupon).subscribe(data => {
          console.log(data);
          //this.snack.open("User Registered Successfully", '',{duration:3000});
        
    
          let currentUrl = this.router.url;
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate([currentUrl]);
        }, err => {
    
          Swal.fire("Unexpected error occurred")
          console.log(err);
        })
      }
    })
  
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }



    //update COupon
    updateCoupon(coupon:CouponLatest)
    {
      let d=this.dialog.open(UpdateCouponComponent,{height:'600px',width:'600px',data:{coupon}});
      d.afterClosed().subscribe(data => {
        
        console.log(data);
        window.location.reload()
        
      })
    }

    goToLink(url: string) {
      if (url.substring(0, 5) !== "https") {
        window.open("https://" + url, "_blank");
      }
      else {
        window.open(url, "_blank");
      }
  
    }


}
