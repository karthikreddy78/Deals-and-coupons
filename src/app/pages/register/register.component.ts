import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { faRegistered } from '@fortawesome/free-regular-svg-icons';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  faReg=faRegistered
  roles=["USER","COMPANY"]
 
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
  constructor(private authenticationService:AuthenticationService, private router: Router,private snack:MatSnackBar) { }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.id) {
      this.router.navigate(['/home']);
      return;
    }
  }

  register() {
    this.authenticationService.register(this.user).subscribe(data => {
      console.log(data);
      //this.snack.open("User Registered Successfully", '',{duration:3000});
      Swal.fire( "Registered Successfully")
      
      this.router.navigate(['/login']);
    }, err => {
      if (err?.status === 409) {
        this.errorMessage = 'Username already exist.';
      } else {
        this.errorMessage = 'Unexpected error occurred. Error is: ' + err?.errorMessage;
        console.log(err);
      }
    }
    )
  }

 
  

}
