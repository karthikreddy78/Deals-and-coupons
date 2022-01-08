import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: User = new User;
  role:string="";

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    
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
    
  }

  isAdmin() {
    //console.log(this.role);
    
    return this.role === "ADMIN";
  }

  isCompany()
  {
    return this.role === "COMPANY";
  }

  isUser()
  {
    return this.role === "USER";
  }

  logOut() {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
  }

  properRole()
  {
    if(this.isAdmin())
    {
      this.router.navigate(['/admin']);
    }
    else if(this.isCompany())
    {
      this.router.navigate(['/company']);
    }
    else
    {
      this.router.navigate(['/user']);
    }
  }

}
