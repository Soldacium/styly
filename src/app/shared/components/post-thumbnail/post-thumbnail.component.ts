import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-post-thumbnail',
  templateUrl: './post-thumbnail.component.html',
  styleUrls: ['./post-thumbnail.component.sass']
})
export class PostThumbnailComponent implements OnInit {
  @Input()
  title = '';

  @Input()
  author!: Observable<User | null>;
  /* = {
    name: '',
    username: '',
    email: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    description: '',
    postsIDs: [],
    followers: 0,
    uid: ''
  }; */

  @Input()
  date = '';

  @Input()
  desc = '';

  @Input()
  color = '#a64ac9'

  @Input()
  image!: Observable<string>;

  @Input()
  type = '';

  @Output() onclick:
  EventEmitter<Event> = new EventEmitter<Event>();

  imageReady = '';

  ngOnInit(): void {
    this.getImageLink();
  }

  getImageLink(): void {
    this.image.subscribe(img => {
      this.imageReady = img;
    })
  }

  clickButton(event: Event): void{
    this.onclick.emit(event);
  }

}
