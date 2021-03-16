import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.sass']
})
export class UserPostsComponent implements OnInit {

  posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor() { }

  ngOnInit(): void {
  }

  viewPost(post: any){

  }


}
