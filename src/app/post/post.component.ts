import { Component, OnInit } from '@angular/core';
import { Comment } from '../shared/models/comment.model';
import { Post } from '../shared/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

  post: Post = {
    title: '',
    tags: [''],
    date: '',
    content: '',
    comments: [],
    summary: '',
    imageUrl: '',
    hasEvent: false
  };
  isWritingResponse = '';
  commentInput = '';
  responseInput = '';
  constructor() { }

  ngOnInit(): void {
  }

  postResponse(comment: Comment){

  }

  postComment(): void {

  }


}
