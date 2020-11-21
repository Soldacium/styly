import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  meetings = [1,2,3,4,5]
  constructor() { }

  ngOnInit() {
  }

}
