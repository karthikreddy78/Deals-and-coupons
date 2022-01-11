import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';
import { UpdateprofileComponent } from '../updateprofile/updateprofile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User = new User;
  user: User | undefined;
  role:string="";

  constructor(private authenticationService: AuthenticationService, private router: Router,private dialog:MatDialog,
    private userService:UserService,private adminService: AdminService,private companyService: CompanyService) {
    
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
      //console.log((this.currentUser.roles));
      var iterator = this.currentUser.roles?.values();
     
      
        this.role=iterator?.next()?.value['role']
      console.log(this.role);

      
      //this.role= data.roles[0].role;
    });


    
  }

  ngOnInit(): void {

    this.getUserdetails()

  }


  updateUser()
  {
    const upuser=this.currentUser
    let d=this.dialog.open(UpdateprofileComponent,{height:'600px',width:'600px',data:{upuser}});
    d.afterClosed().subscribe(data => {
      
      console.log(data);

      window.location.reload()
      
    })
  }

  getUserdetails()
  {
    if(this.role==="ADMIN")
    {
      this.adminService.getUserById().subscribe(data=>{
        console.log(data);
        this.user=data
        
      },error=>{
        console.log(error);
        
      })
    }
    else if(this.role === "COMPANY")
    {
      this.companyService.getUserById().subscribe(data=>{
        console.log(data);
        this.user=data
        
      },error=>{
        console.log(error);
        
      })
    }
    else if(this.role === "USER"){

      this.userService.getUserById().subscribe(data=>{
        console.log(data);
        this.user=data
        
      },error=>{
        console.log(error);
        
      })

    }
    console.log(this.user);
    
  }

}
