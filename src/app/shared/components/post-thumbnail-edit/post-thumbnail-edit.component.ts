import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post-thumbnail-edit',
  templateUrl: './post-thumbnail-edit.component.html',
  styleUrls: ['./post-thumbnail-edit.component.sass']
})
export class PostThumbnailEditComponent {

  @Input()
  title = '';

  @Input()
  author = '';

  @Input()
  date = '';

  @Input()
  desc = '';

  @Input()
  color = '#a64ac9'

  @Input()
  image = 'assets/icons/arrow.svg';

  @Output() onclick:
  EventEmitter<Event> = new EventEmitter<Event>();

  clickButton(event: Event): void{
    this.onclick.emit(event);
  }
}
