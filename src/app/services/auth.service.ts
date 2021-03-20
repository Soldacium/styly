import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!: Observable<firebase.User | null>;
  userInfo!: firebase.User;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {
      this.user = this.afAuth.authState;
      this.user.subscribe(user => {
        if (user){
          this.userInfo = user;
          console.log(user);
          localStorage.setItem('user', JSON.stringify(this.userInfo));
        } else {
          localStorage.setItem('user', 'null');
        }
      });
    }

  authUser(): Observable<firebase.User | null> {
    return this.user;
  }

  loginWithCredentials(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
      console.log(user);
    });
  }

  loginWithGoogle(){
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  registerWithCredentials(email: string, password: string, username: string): void {
    this.afAuth.createUserWithEmailAndPassword(email, password).then(user => {
      console.log(user);
    });
  }

  registerWithGoogle(){

  }
}
