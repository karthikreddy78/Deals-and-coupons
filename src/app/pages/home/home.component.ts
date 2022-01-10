import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CouponLatest } from 'src/app/models/coupon-latest.model';
import { CouponNew } from 'src/app/models/coupon-new.model';
import { Coupon } from 'src/app/models/coupon.model';
import {
  faShippingFast,
  faBoxOpen,
  faTint,
  faClipboardCheck,
  faRupeeSign,
  faClock,
  faWallet,
  faChartLine,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  fastShippingIcon = faShippingFast;
  boxopenIcon = faBoxOpen;
  dropIcon = faTint;
  clipboardIcon = faClipboardCheck;
  rupeeIcon = faRupeeSign;
  clockIcon = faClock;
  walletIcon = faWallet;
  growthIcon = faChartLine;
  mobile = faPhone;
  envelope = faEnvelope;
  marker = faMapMarkerAlt;
  constructor(private httpClient: HttpClient,private authenticationService:AuthenticationService) { }
  ngOnInit(): void {
    
  }

  uploadedImage: any;
  dbImage: any;
  postResponse: any;
  successResponse: string="";
  image: any;
  coupon:CouponLatest = new CouponLatest();
  couponname:any
  company:any;
  couponLists:any;

  public onImageUpload(event:any) {
    this.uploadedImage = event.target.files[0];
  }


  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('coup', this.uploadedImage, this.uploadedImage?.name);



    this.httpClient.post('http://localhost:5100/upload/image/', imageFormData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.postResponse = response;
          this.successResponse = this.postResponse.body.message;
        } else {
          this.successResponse = 'Image not uploaded due to some error!';
        }
      }
      );
    }

  viewImage() {
    this.httpClient.get('http://localhost:5100/get/image/info/' + this.image)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      );
  }


  viewCouponImage() {
    this.httpClient.get('http://localhost:5100/coupons/get/image/' + this.couponname)
      .subscribe(
        res => {
          console.log(res);
          
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      );
  }



  addCouponAction() {
   
    console.log(this.coupon);
    
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage?.name);

    //formData.append('file2', this.selectedFile2);
    imageFormData.append('coupon', new Blob([JSON
      .stringify(this.coupon)], {
      type: 'application/json'
    }));
    
    this.httpClient.post('http://localhost:5100/coupons/addcoupon',  imageFormData)
    .subscribe((response) => {
        this.postResponse = response;
        this.successResponse = this.postResponse.body.message;
      } 
    
      );
    }



    

onSubmit() {
    
  const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage?.name);
    //formData.append('file2', this.selectedFile2);
    imageFormData.append('coupon', new Blob([JSON
      .stringify(this.coupon)], {
      type: 'application/json'
    }));
    this.authenticationService.postCouponFake(imageFormData).subscribe(data=>
        {
          console.log(data);
          
        },(err)=>{
          console.log(err);
          
        })
  
}

viewCouponCompany() {
  this.httpClient.get('http://localhost:5100/coupons/company/' + this.company)
    .subscribe(
      res => {
        console.log(res);
        
        this.couponLists = res;
        this.couponLists.forEach((c: { image: string; }) => {
          c.image= 'data:image/jpeg;base64,'+ c.image
          
        });
        console.log(this.couponLists);
      }
    );
}




}
