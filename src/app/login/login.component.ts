import { Component, OnInit } from '@angular/core';
import anime from 'animejs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  backgroundColor = '#f9f9f9';
  borderColor = '#111';

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
    cards: false
  };

  mode: 'login' | 'register' = 'login';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.simpleThumbnails = Array(this.numOfSimpleThumbnails).fill(0).map((x, i) => i);
  }


  changeMode(): void {
    if (this.mode === 'login'){
      this.mode  = 'register';
      this.animateThumbnailsForward();
    }else{
      this.mode = 'login';
      this.animateThumbnailsBackwards();
    }
  }

  animateThumbnailsForward(): void {
    this.simpleThumbnailsNodes = document.querySelectorAll('.simpleThumbnail');
    this.simpleThumbnailsNodes.forEach((thumb, i) => {
      anime({
        targets: thumb,
        duration: 500,
        delay: (this.simpleThumbnailsNodes.length - i) * 15,
        rotateX: [0, 180],
        easing: 'easeInOutCirc'
      });
    });
  }

  animateThumbnailsBackwards(): void {
    this.simpleThumbnailsNodes.forEach((thumb, i) => {
      anime({
        targets: thumb,
        duration: 500,
        delay: i * 15,
        rotateX: [180, 0],
        easing: 'easeInOutCirc'
      });
    });
  }

  loginWithCredentials(): void {
    this.authService.loginWithCredentials(this.loginCreds.email, this.loginCreds.password);
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  registerWithCredentials(): void {
    this.authService.registerWithCredentials(this.registerCreds.email, this.registerCreds.password1, this.registerCreds.username);
  }

}
