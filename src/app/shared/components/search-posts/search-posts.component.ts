import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-posts',
  templateUrl: './search-posts.component.html',
  styleUrls: ['./search-posts.component.sass']
})
export class SearchPostsComponent {

  @Input() placeholder = '';
  @Input() label = '';
  @Input() type: 'text'|'number'|'email'|'password'|'datetime-local' = 'text';
  @Input() darkMode = false;
  @Input() textColor = 'black';

  @Input() inputModel = '';
  @Output() inputModelChange = new EventEmitter<string>();

}
