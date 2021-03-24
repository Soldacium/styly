import { Component, OnInit } from '@angular/core';

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

  chosenTag = '';
  postTags: string[] = ['Party', 'Meeting', 'Concert', 'Happening', 'Opening', ];

  addRelatedEvent = true;

  event = {
    relatedPostID: '',
    description: '',
    title: '',
    time: ''
  }

  currentPost = {
    title: '',
    tags: [''],
    date: '',
    content: '',
    comments: [],
    summary: '',
    imageUrl: '',
    hasEvent: this.posted
  };

  sectionsOpen = {
    basics: true,
    content: false,
    reco: false
  }

  constructor(){}

  ngOnInit(): void {
  }

  openPost(post: number): void {

  }

  postPost(): void {

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

  pickTag(type: string): void {
    this.chosenTag === type ? this.chosenTag = '' : this.chosenTag = type;
  }
}
