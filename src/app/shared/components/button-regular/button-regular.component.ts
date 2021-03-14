import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-regular',
  templateUrl: './button-regular.component.html',
  styleUrls: ['./button-regular.component.sass']
})
export class ButtonRegularComponent{

  @Input()
  text = '';

  @Input()
  img = '';

  @Input()
  deviation = '';

  @Input()
  inverted = false;

  @Output() onclick:
  EventEmitter<Event> = new EventEmitter<Event>();

  clickButton(event: Event): void{
    this.onclick.emit(event);
  }
}
