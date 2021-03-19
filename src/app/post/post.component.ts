import { Component, OnInit } from '@angular/core';
import { Comment } from '../shared/models/comment.model';
import { Post } from '../shared/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass'],
  animations: []
})
export class PostComponent implements OnInit {

  post: Post = {
    title: 'Title of first post',
    tags: ['ayy','2'],
    date: '21/05/2015',
    author:'A random author',
    content: '',
    comments: [],
    summary: '',
    imageUrl: 'assets/images/BGs/explosion1.png',
    hasEvent: false
  };

  isWritingResponse = '';
  commentInput = '';
  responseInput = '';
  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  postResponse(comment: Comment): void {

  }

  postComment(): void {

  }


}
