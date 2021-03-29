import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { User } from '../shared/models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private authService: AuthService,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }


  getUser(userID: string): AngularFireObject<User>{
    const path = `/users/${userID}`;
    return this.db.object(path);
  }

  updateUser(user: User): Promise<User | void> {
    const path = `/users/${user.uid}`;
    return this.db.object(path).update(user);
  }

  getUserPicture(userID: string){
    return this.storage.ref(`profileImg/${userID}`).getDownloadURL();
  }

  updateUserPicture(img: File,userID: string): AngularFireUploadTask{
    return this.storage.upload(`profileImg/${userID}`, img);
  }


}


