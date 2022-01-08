import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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

}
