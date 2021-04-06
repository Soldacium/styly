import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/shared/models/post.model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.sass']
})
export class EditPostComponent implements OnInit {

  public imagePath!: string;
  imgURL: any;
  public message!: string;

  file!: File;
  posted = false;

  chosenType = '';
  postTypes: string[] = ['Amazement', 'Essay', 'Guide', 'Something' ];

  chosenTags: string[] = [];
  postTags: string[] = ['Party', 'Meeting', 'Concert', 'Happening', 'Opening', ];

  addRelatedEvent = true;

  event = {
    relatedPostID: '',
    description: '',
    title: '',
    time: ''
  };

  post: Post = {
    title: '',
    tags: [''],
    date: '',
    content: '',
    comments: [],
    summary: '',
    uid: '',
    authorID: '',
    type: ''
  };

  sectionsOpen = {
    basics: true,
    content: false,
    reco: false
  };

  constructor(private postService: PostsService, private authService: AuthService){}

  ngOnInit(): void {
  }

  postPost(): void {
    const newPost = this.modifyPost();
    this.postService.postPost(newPost).then(res => {
      console.log(res);
    })
  }

  modifyPost(): Post {
    return {
      ...this.post,
      authorID: this.authService.userInfo.uid,
      tags: this.chosenTags,
      type: this.chosenType,
      date: new Date().toString()
    }
  }

  preview(files: any): void {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
    };
    this.file = files[0];
  }

  pickType(type: string): void {
    this.chosenType = type;
  }

  pickTag(tag: string): void {
    if(this.chosenTags.includes(tag)){
      this.chosenTags.splice(this.chosenTags.indexOf(tag),1);
    } else {
      this.chosenTags.push(tag);
    }
  }


}
