import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-icon',
  templateUrl: './input-icon.component.html',
  styleUrls: ['./input-icon.component.sass']
})
export class InputIconComponent {

  @Input() placeholder = '';
  @Input() label = '';
  @Input() type: 'text'|'number'|'email'|'password'|'datetime-local' = 'text';
  @Input() darkMode = false;
  @Input() textColor = 'black';

  @Input() inputModel = '';
  @Output() inputModelChange = new EventEmitter<string>();

}