import { Category } from "./category.model";

export class CouponLatest {
    code:string="";
    company:string="";
    category:Category =Category.Clothing;
    couponname:string="";
    description:string="";
    startDate: Date = new Date();
     endDate:Date =new Date(this.startDate.getFullYear()+1,this.startDate.getMonth(),this.startDate.getDate());
    offer:number =5;
    url:string=""
    cost:number=0
    imagename:string="";

    imagetype:string="";
    image:any;
    constructor()
    {}
    // constructor(code: string,company: string,category:Category,couponname:string,description:string,
    //     startDate: Date,endDate:Date,offer:number)
    // {
    //     this.code=code;
    //     this.company=company;
    //     this.category=category;
    //     this.couponname=couponname;
    //     this.description=description
    //     this.startDate=startDate;
    //     this.endDate=endDate
    //     this.offer=offer


    // }
}