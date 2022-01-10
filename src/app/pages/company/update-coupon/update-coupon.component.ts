import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon.model';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CouponLatest } from 'src/app/models/coupon-latest.model';
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
   datavalue:any;
   coupon:CouponLatest =new CouponLatest();
   coupon1:Coupon=new Coupon();
 
   
   
 
  
   errorMessage: string = "";
  uploadedImage: any;
 
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
   constructor(private companyService: CompanyService, private router: Router ,@Inject(MAT_DIALOG_DATA) data:CouponLatest) {
     this.datavalue= data
     console.log(this.datavalue.coupon);
     
    }
    
 
   ngOnInit(): void {
     this.coupon = this.datavalue.coupon
     //this.coupon1=this.datavalue.coupon
     
     const logKey = (key: keyof Coupon) => {
      console.log(this.coupon1[key])
  }
  console.log(logKey);
  
  
  // for(let key in this.coupon1) {
  //     logKey(key)
  // }
     
    
   }
 
 
   register()
   {
     this.coupon1.company=this.companyService.currentUser.id
     console.log(this.coupon1);
     
     
     
    
     
     
     this.companyService.updateCouponByName(this.coupon).subscribe(data=>{
       Swal.fire( "Coupon Updated Successfully")
 
     }, err => {
       if (err?.status === 409) {
         Swal.fire('Coupon Code already exist.');
       } else {
         Swal.fire('Unexpected error occurred. Error is: ' + err?.errorMessage);
         console.log(err);
       }
     })
 
     
     
   }

  isCoupon(){
    //console.log("isCoupon+" + this.coupon.code);
    
    if(this.coupon.code !=null)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  public onImageUpload(event:any) {
    this.uploadedImage = event.target.files[0];
  }

  updateCouponAction() {

    this.coupon.company = this.companyService.currentUser.id
    console.log(this.coupon);


    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage?.name);

    //formData.append('file2', this.selectedFile2);
    imageFormData.append('coupon', new Blob([JSON
      .stringify(this.coupon)], {
      type: 'application/json'
    }));

    this.companyService.addCoupon(imageFormData).subscribe((response) => {

     console.log(response);
     if(response!=null)
     {
      Swal.fire( "Updated Successfully")
      this.router.navigate(['/company/companycoupons'])
     }
     
    },err => {
      console.log(err);
      
    }
    )

 
  }
 
   
 }
 
 