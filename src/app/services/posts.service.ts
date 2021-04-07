import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Post } from '../shared/models/post.model';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }

  postPost(post: Post): Promise<Post | void>  {
    const dbRef = this.db.database.ref(`/posts/`);
    return dbRef.push(post).then(postRef => {
      post.uid = postRef.key || '';
      this.updatePost(post);
      return post;
    });
  }

  updatePost(post: Post): Promise<Post | void>  {
    const path = `/posts/${post.uid}`;
    return this.db.object(path).set(post);
  }

  updatePostPicture(img: File, userID: string): AngularFireUploadTask{
    return this.storage.upload(`profileImg/${userID}`, img);
  }

  getPostPicture(userID: string): Observable<string> {
    return this.storage.ref(`profileImg/${userID}`).getDownloadURL();
  }

  getPost(postID: string): AngularFireObject<Post>{
    const path = `/posts/${postID}`;
    return this.db.object(path);
  }
}
