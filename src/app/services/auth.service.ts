import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app'
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  private authState: any;


  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {
      this.user = afAuth.authState;
  }

  authUser(): Observable<firebase.User> {
    
    return this.user;
  }

  getID(){
    this.user.subscribe( user => {
      if(user){
        console.log(user.uid)
        return user;
      }
      
    })

    

    this.user.subscribe()
  }

  get currentUserID() {
    //let ID = this.user.subscribe(user => {return user.uid})
    return this.authState !== null ? this.authState.user.uid : '';
  }


  // for not letting unlogged users
  get authenticated(): boolean {
    const user = this.getID()
    console.log(user)
    //this.authState = this.user;
    return (user !== undefined && user !== null)
    return (this.authState !== null && this.authState !== undefined);// && this.authState !== undefined
  }

  getAuth(): Observable<any> {return this.afAuth.authState}

  login(email: string,password: string){
    return this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then((user) => {
      this.authState = user;
      console.log(this.authState)
      /*
      const status = 'online';
      this.setUserStatus(status);
      */
      
    }).then(() => {
      this.router.navigate(['/account/profile']);
      console.log('done with second task')
    })
  }

  async logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);      
    }); 
    //
  }

  

  signUp(email: string, password: string, displayName: string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then((user) => {
      this.authState = user;
      console.log(this.authState);
      this.router.navigate(['/account/profile']);
      //const status = 'online';
      this.setUserData(displayName,email = email , status)
    }).catch(error => console.log(error))
  }

  deleteAccount(){
    return this.afAuth
  }

  reAuth(){
    
  }

  setUserData(userName: string, facebook?: string, insta?: string, pinterest?: string, email?: string, ){

    const links = {
      facebook: facebook ? facebook : '',
      instagram: insta ? insta : '',
      pinterest: pinterest ? pinterest : '',
      email: email ? email : ''
    }
    const path = `users/${this.currentUserID}`;
    console.log(this.currentUserID)
    const data: User = {
      displayName: userName,
      totalPosts: 0,
      postsIDs: [],
      links: links,
      options: {
        newsletter: true,
        bonus: true
      },
      desc: 'This is place for your description'


    }

    console.log(path, data, links)

    this.db.object(path).set(data)
    .catch(error => console.log(error))
  }

  
}
