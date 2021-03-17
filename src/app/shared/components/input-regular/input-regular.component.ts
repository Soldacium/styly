import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-regular',
  templateUrl: './input-regular.component.html',
  styleUrls: ['./input-regular.component.sass']
})
export class InputRegularComponent {

  @Input() placeholder = 'Input here';
  @Input() label = 'Basic label';
  @Input() type: 'text'|'number'|'email'|'password'|'datetime-local' = 'text';
  @Input() darkMode = false;
  @Input() textColor = 'black';
  @Input() backgroundColor = '#fff';
  @Input() borderColor = '#000'

  @Input() inputModel = '';
  @Output() inputModelChange = new EventEmitter<string>();


}
