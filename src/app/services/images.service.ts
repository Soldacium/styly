import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app'

import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private storage: AngularFireStorage) { }

  getPostImage(postID: string){
    
  }

  /*
  uploadFile(file, filePath) {
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    return task;
  }
  */
 uploadPostPhoto(file, postId:string) {
    
    return this.storage.upload(`posts/${postId}`, file);
  }

  deletePostPhoto(id){
    console.log(`posts/${id}`)
    return this.storage.ref(`posts/${id}`).delete()
  }

  getPostPhoto(id){
    const storageRef = this.storage.ref(`posts/${id}`);
    
    storageRef.getDownloadURL().subscribe(url => {
      /*
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function(event) {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
      */
    
      // Or inserted into an <img> element:
      /*
      let img: HTMLImageElement = document.querySelector('#myimg');
      img.src = url;*/
      console.log(url)
    })

    return storageRef.getDownloadURL();
  }
  updatePostImage(postID: string){
    
  }



  getUserImage(userID: string){
    const storageRef = this.storage.ref(`profileImg/${userID}`);
    return storageRef.getDownloadURL();
  }

  updateUserImage(userID: string, file){

    return this.storage.upload(`profileImg/${userID}`, file).then(() => {
      console.log('uploaded')
    }).catch(err => {
      console.log(err)
    })
  }


}
