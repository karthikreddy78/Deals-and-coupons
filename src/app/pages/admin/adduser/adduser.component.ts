import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  roles=["USER","COMPANY","ADMIN"]
 
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
  constructor(private adminService:AdminService,private router:Router) { }

  ngOnInit(): void {
  }

  register() {
    this.adminService.addUser(this.user).subscribe(data => {
      console.log(data);
      //this.snack.open("User Registered Successfully", '',{duration:3000});
      Swal.fire( "Registered Successfully")
      this.router.navigate(['/admin/getallusers'])
      
    }, err => {
      if (err?.status === 409) {
        this.errorMessage = 'Username already exist.';
      } else {
        this.errorMessage = 'Unexpected error occurred. Error is: ' + err?.errorMessage;
        console.log(err);
      }
    })
  }
}
