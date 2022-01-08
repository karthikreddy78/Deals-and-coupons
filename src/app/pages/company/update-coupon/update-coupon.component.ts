import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon.model';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.css']
})
export class UpdateCouponComponent implements OnInit {

  categories=[
    'Clothing',
     'Footwear',
     'Electronics',
     'Restaurants',
     'Travel',
     'Gifts',
     'Home'
   ]
 
   categoryHasError=true;
   
 
 
 
 
   coupon:Coupon = new Coupon();
   errorMessage: string = "";
 
   validateCategory(value:string)
   {
     if(value==="default")
     {
       this.categoryHasError=true;
     }
     else
     {
       this.categoryHasError=false
     }
   }
   constructor(private companyService: CompanyService, private router: Router) { }
 
   ngOnInit(): void {
   }
 
 
   register()
   {
     this.coupon.company=this.companyService.currentUser.id
     console.log(this.coupon);
     
     this.companyService.addCoupon(this.coupon).subscribe(data=>{
       Swal.fire( "Coupon Added Successfully")
 
     }, err => {
       if (err?.status === 409) {
         Swal.fire('Coupon Code already exist.');
       } else {
         Swal.fire('Unexpected error occurred. Error is: ' + err?.errorMessage);
         console.log(err);
       }
     })
 
     
     
   }
 
   
 }
 
 