import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user!: Observable<firebase.User | null>;
  userInfo!: firebase.User;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {
      this.user = this.afAuth.authState;
      this.user.subscribe(user => {
        if (user){
          this.userInfo = user;
          localStorage.setItem('user', JSON.stringify(this.userInfo));
        } else {
          localStorage.setItem('user', 'null');
        }
      });
    }

  authUser(): Observable<firebase.User | null> {
    return this.user;
  }

  registerWithCredentials(email: string, password: string, username: string): void {
    this.afAuth.createUserWithEmailAndPassword(email, password).then(user => {
      const registeredUserID = user.user ? user.user.uid : '';
      const path = `users/${registeredUserID}`;
      const newUserData = this.makeUserData(email, username, registeredUserID);
      try{
        this.db.object(path).set(newUserData).then(res => {
          this.loginWithCredentials(email, password);
        });
      } catch (error){
        console.log(error);
      }
    });
  }

  registerWithGoogle(){

  }

  private makeUserData(email: string, username: string, userID: string): User {
    return {
      username,
      name: '',
      email,
      facebook: '',
      instagram: '',
      linkedin: '',
      description: '',
      postsIDs: [],
      followers: 0,
      uid: userID
    };
  }

  loginWithCredentials(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
      this.router.navigate(['/user/profile']);
    });
  }

  loginWithGoogle(): void {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logOut(): void {
    this.afAuth.signOut().then(res => {
      this.router.navigate(['/']);
    })
  }


}
