import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-getallusers',
  templateUrl: './getallusers.component.html',
  styleUrls: ['./getallusers.component.css'],
})
export class GetallusersComponent implements OnInit {
  faUser = faUserCircle;
  userList: Array<User> = [];
  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.getallusers();
  }

  getallusers() {
    this.adminService.getAllUsers().subscribe(
      (data) => {
        this.userList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteUser(user: User) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteUser(user).subscribe(
          (data) => {
            console.log(data);
            this.getallusers();
            if (data != null) {
              Swal.fire('Deleted!', 'User has been deleted.', 'success');
            }
          },
          (err) => {
            Swal.fire('Unexpected error occurred');
            console.log(err);
            return;
          }
        );
      }
    });
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
