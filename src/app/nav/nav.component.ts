import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {

  active = false;
  scrolled = false;

  ngOnInit(): void {
    this.addListeners();
  }

  addListeners(){
    window.addEventListener('scroll', (e) => {
      // console.log(e);
      if(window.scrollY > 60){
        this.scrolled = true;
      }else{
        this.scrolled = false;
      }


    })
  }

}
