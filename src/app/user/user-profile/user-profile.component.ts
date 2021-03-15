import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  public imagePath!: string;
  imgURL: any;
  public message!: string;

  file!: File;
  posted = false;

  profile = {
    name: '',
    username: '',
    linkInsta: '',
    linkFb: '',
    linkLinkedIn: ''
  }

  constructor() { }

  ngOnInit(): void {
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
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };

    this.file = files[0];
  }

}
