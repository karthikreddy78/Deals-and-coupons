import { Component, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { User } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-getusersonrole',
  templateUrl: './getusersonrole.component.html',
  styleUrls: ['./getusersonrole.component.css']
})
export class GetusersonroleComponent implements OnInit {

  faUser = faUserCircle;
  role="";
  userList:Array<User>=[]


  roles=["ADMIN","USER","COMPANY"]
 
  roleHasError=true;
  




  user: User = new User();
  errorMessage: string = "";

  validateRole(value:string)
  {
    if(value==="default")
    {
      this.roleHasError=true;
    }
    else
    {
      this.roleHasError=false
    }
  }
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
      
  }

  register()
  {

    this.adminService.getUsersonRole(this.user.token).subscribe(data=>{
      this.userList=data
    }, err => {
      console.log(err);
    })
  }

}
