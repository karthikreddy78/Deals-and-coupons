import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  arr: Category[] =[];

  constructor() { }

  ngOnInit(): void {
    this.arr= Object.values(Category)
    Object.values(Category).forEach((value) => {
      console.log(value);
    });
  }

}
