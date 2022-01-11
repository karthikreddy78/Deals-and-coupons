import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  arr: Array<String> = [];
  constructor() { }

  ngOnInit(): void {
    this.arr= Object.values(Category)
    Object.values(Category).forEach((value) => {
      console.log(value);
    });
  }

 

}
