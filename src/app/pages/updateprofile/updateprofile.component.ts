import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {

  currentUser: User = new User();
  userdata:any
  user:User = new User();
  role: string = '';
  constructor(private authenticationService:AuthenticationService,@Inject(MAT_DIALOG_DATA) data:User,
  private userService:UserService,private adminService: AdminService,private companyService: CompanyService
  ) {
    this.userdata=data
    console.log(this.userdata);
    
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
    this.user=this.userdata.upuser
    console.log(this.user);
    
  }

  update()
  {
    console.log(this.user);
    console.log(this.role);
    if(this.role==="ADMIN")
    {
      this.adminService.updateUser(this.user).subscribe(data=>{
        console.log(data);
        
      },error=>{
        console.log(error);
        
      })
    }
    else if(this.role === "COMPANY")
    {
      this.companyService.updateUser(this.user).subscribe(data=>{
        console.log(data);
        
      },error=>{
        console.log(error);
        
      })
    }
    else if(this.role === "USER"){

      this.userService.updateUser(this.user).subscribe(data=>{
        console.log(data);
        
      },error=>{
        console.log(error);
        
      })

    }
    
    
  }

}
