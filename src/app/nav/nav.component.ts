import { Component, OnInit } from '@angular/core';
import anime from 'animejs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {

  active = false;
  scrolled = false;
  fillElement1!: HTMLElement;
  fillElement2!: HTMLElement;

  ngOnInit(): void {
    this.fillElement1 = document.querySelector('.fill1') as HTMLElement;
    this.fillElement2 = document.querySelector('.fill2') as HTMLElement;
    this.addListeners();
  }

  addListeners(): void {
    window.addEventListener('scroll', (e) => {
      if (window.scrollY > 60){
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    });
  }

  circleToSquare(): void{
    anime({
      targets: this.fillElement1,
      width: ['3rem', '180vw'],
      height: ['3rem', '180vw'],
      duration: 1000,
      borderRadius: ['50%', '50%'],
      easing: 'easeInOutQuad'
    });

    anime({
      targets: this.fillElement2,
      width: ['3rem', '180vw'],
      height: ['3rem', '180vw'],
      duration: 1000,
      delay: 300,
      borderRadius: ['50%', '50%'],
      easing: 'easeInOutQuad'
    });
  }

  squareToCircle(): void{
    anime({
      targets: this.fillElement1,
      width: ['180vw', '3rem'],
      height: ['180vw', '3rem'],
      duration: 1000,
      backgroundColor: 'white',
      borderRadius: ['50%', '50%'],
      easing: 'easeInOutQuad'
    });

    anime({
      targets: this.fillElement2,
      width: ['180vw', '3rem'],
      height: ['180vw', '3rem'],
      duration: 1000,
      delay: 300,
      backgroundColor: 'white',
      borderRadius: ['50%', '50%'],
      easing: 'easeInOutQuad'
    });
  }

  change(): void {
    this.active = !this.active;
    if (this.active){
      this.circleToSquare();
    } else {
      this.squareToCircle();
    }
  }


}
