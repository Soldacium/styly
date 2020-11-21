import { Injectable, AfterContentChecked } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

import { AuthService } from './auth.service';

import { User } from '../models/user.model';
import { ImagesService } from './images.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: firebase.User;
  userName: string;
  userID: string;

  viewedUser: firebase.User;
  postIDs;

  constructor(
    private authService: AuthService,
    public db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private imageService: ImagesService) {
      // auth state obesrvale, used to set user object
      this.afAuth.authState.subscribe(auth => {
        if (auth !== undefined && auth !== null) {
          this.user = auth;
          console.log(this.user);
          this.userID = this.user.uid;

          // gotten user is custom model just for this function to counter compilation error on a.displayName
          this.getUser(this.userID).valueChanges().subscribe((u: User) => {
            const userData = this.db.list(`users/${this.user.uid}`, (ref) => {
              return ref.child('displayName');
            });
            this.userName = u.displayName ;
            console.log(this.userName);

          });
        } else {
          this.userName = 'Guest';
        }
      });
  }








  newUser(id: string) {
    const userId = this.userID;
    const path = `/users/${userId}`;

    if (this.db.object(path)) {

    }

  }

  waitForAuth() {
    return new Promise((resolve, reject) => {

      const unsubscribe = this.afAuth.auth.onAuthStateChanged((user: firebase.User ) => {
         unsubscribe();
         resolve(user);
      }, reject);
   });
  }

   getUser(id) {

      const userId = id; // 'r2lA8g76uDP8Cu91oA61OG422PQ2'
      const path = `/users/${userId}`;
      console.log(this.user);

      if (this.db.object(path)) {

        return this.db.object(path);
      }

  }

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }

  getUserInfo() {

  }

  updateUserInfo(name: string, facebook: string, instagram: string, pinterest: string, email: string) {
    const userId = this.user.uid;
    const path = `/users/${userId}/links`;

    const links = {
      facebook: facebook ? facebook : '',
      instagram: instagram ? instagram : '',
      pinterest: pinterest ? pinterest : '',
      email: email ? email : ''
    };
    return this.db.object(path).set(links);
  }

  updateUserDesc(desc: string) {
    const userId = this.user.uid;

    const path = `/users/${userId}/desc`;
    console.log(path);

    return this.db.object(path).set(desc);
  }





  updateProfilePicture(file) {
    const userId = this.user.uid;
    const path = `/users/${userId}/imageID`;
    this.db.object(path).set(userId);

    return this.imageService.updateUserImage(userId, file);
  }

  getProfilePic(userID?) {
    let id;
    if(userID){
      id = userID
    }else{
      id = this.user.uid;
    }
    return this.imageService.getUserImage(id);
  }






  updatePostList(id: string) {
    const userId = this.user.uid;
    const path = `/users/${userId}/postsIDs`;
    return this.db.list(path).set(id, id);
  }

  deleteFromPostList(id) {
    const userId = this.user.uid;
    const path = `/users/${userId}/postsIDs`;

    return this.db.list(path).remove(id);
  }

  getUserPosts() {
    const userId = this.user.uid;
    const path = `/users/${userId}/postsIDs`;
    /*
    this.db.list(path, ref => {

    })
    */
  }






  updatePassword(oldPassword: string, newPassword: string) {
    const credential = firebase.auth.EmailAuthProvider.credential(this.user.email, oldPassword);
    this.user.reauthenticateWithCredential(credential).then(() => {
      this.user.updatePassword(newPassword).then(() => {

      }).catch((error) => {
        console.log(error);
        alert('Error while updating');
      })
    }).catch((error) => {
      console.log(error);
      alert('Wrong password');
    });

  }

  updateEmail(newEmail: string) {
    this.user.updateEmail(newEmail).then(() => {

    }).catch((error) => {
      console.log(error);
    });
  }

  deleteUser() {
    this.user.delete().then(() => {

    }).catch((error) => {
      console.log(error);
    });
  }

  reAuth(password) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      this.user.email,
      password
    );
    this.user.reauthenticateWithCredential(credential);
  }


}
