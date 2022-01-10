import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CouponLatest } from 'src/app/models/coupon-latest.model';
import { Coupon } from 'src/app/models/coupon.model';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcoupon',
  templateUrl: './addcoupon.component.html',
  styleUrls: ['./addcoupon.component.css']
})
export class AddcouponComponent implements OnInit {

  categories = [
    'Clothing',
    'Footwear',
    'Electronics',
    'Restaurants',
    'Travel',
    'Gifts',
    'Home'
  ]

  categoryHasError = true;





  coupon: CouponLatest = new CouponLatest();
  errorMessage: string = "";


  uploadedImage: any
  postResponse: any;
  successResponse: any;
  file:any

  validateCategory(value: string) {
    if (value === "default") {
      this.categoryHasError = true;
    }
    else {
      this.categoryHasError = false
    }
  }
  constructor(private companyService: CompanyService, private router: Router,private httpClient: HttpClient) { }

  ngOnInit(): void {
  }


  // register() {
  //   this.coupon.company = this.companyService.currentUser.id
  //   console.log(this.coupon);

  //   this.companyService.addCoupon(this.coupon).subscribe(data => {
  //     Swal.fire("Coupon Added Successfully")

  //   }, err => {
  //     if (err?.status === 409) {
  //       Swal.fire('Coupon Code already exist.');
  //     } else {
  //       Swal.fire('Unexpected error occurred. Error is: ' + err?.errorMessage);
  //       console.log(err);
  //     }
  //   })



  // }



  addCouponAction() {

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
      Swal.fire( "Added Successfully")
      this.router.navigate(['/company/companycoupons'])
     }
     
    },err => {
      console.log(err);
      
    }
    )

 
  }

  public onImageUpload(event:any) {
    this.uploadedImage = event.target.files[0];
  }


  // 


}
























//    addCouponAction1() {
   
  //   console.log(this.coupon);
    
  //   const imageFormData = new FormData();
  //   imageFormData.append('image', this.uploadedImage, this.uploadedImage?.name);

  //   //formData.append('file2', this.selectedFile2);
  //   imageFormData.append('coupon', new Blob([JSON
  //     .stringify(this.coupon)], {
  //     type: 'application/json'
  //   }));
    
  //   this.httpClient.post('http://localhost:5100/coupons/addcoupon',  imageFormData)
  //   .subscribe((response) => {
  //       this.postResponse = response;
  //       this.successResponse = this.postResponse.body.message;
  //     } 
    
  //     );
  //   }


