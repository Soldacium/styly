import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app' 
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  active: boolean = false;
  user: Observable<firebase.User>
  userEmail: string;

  loggedLinks = false;

  imgURL;



  constructor(public router: Router,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
      }
    })

    this.userService.waitForAuth().then((user:firebase.User )=> {  
      
      this.userService.getProfilePic(user.uid).subscribe((url: string) => {
        this.imgURL = url;
      });
    })
  }

  change(){
      this.active = !this.active;
      console.log('yass')
  }

  logout(){
    this.authService.logout()
  }
}
