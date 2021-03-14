import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {

  active = false;

  ngOnInit(): void {
    this.addListeners();
  }

  addListeners(){
    window.addEventListener('scroll', (e) => {
      // console.log(e);
    })
  }

}
