import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.sass']
})
export class UserPostsComponent implements OnInit {

  posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  viewPost(post: any){

  }


}
