import { Component, OnInit } from '@angular/core';
import anime from 'animejs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  backgroundColor = '#3a3a3a';
  borderColor = '#fff';

  numOfSimpleThumbnails = 42;
  simpleThumbnails: number[] = [];
  simpleThumbnailsNodes!: NodeList;

  public loginCreds = {
    email: '',
    password: ''
  };

  public registerCreds = {
    email: '',
    password1: '',
    password2: '',
    username: ''
  };

  doneAnimations = {
    background: false,
  };

  constructor() { }

  ngOnInit(): void {
    this.simpleThumbnails = Array(this.numOfSimpleThumbnails).fill(0).map((x, i) => i);
    this.addEventListeners();
  }

  addEventListeners(): void {
    window.addEventListener('scroll', (e) => {
      if ((window.scrollY / window.innerHeight) > 0.75 && !this.doneAnimations.background){
        this.animateThumbnailsForward();
        this.doneAnimations.background = true;
      }
      if ((window.scrollY / window.innerHeight) < .75 && this.doneAnimations.background){
        this.animateThumbnailsBackwards();
        this.doneAnimations.background = false;
      }
    });
  }

  animateThumbnailsForward(): void {
    this.simpleThumbnailsNodes = document.querySelectorAll('.simpleThumbnail');
    this.simpleThumbnailsNodes.forEach((thumb, i) => {
      anime({
        targets: thumb,
        duration: 500,
        delay: (this.simpleThumbnailsNodes.length - i) * 25,
        rotateX: [0, 180],
        easing: 'easeInOutCirc'
      });
    });
  }

  animateThumbnailsBackwards(){
    this.simpleThumbnailsNodes.forEach((thumb, i) => {
      anime({
        targets: thumb,
        duration: 500,
        delay: i * 25,
        rotateX: [180, 0],
        easing: 'easeInOutCirc'
      });
    });
  }
}
