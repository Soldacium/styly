import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
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

  updatePostPicture(img: File, postID: string): AngularFireUploadTask{
    return this.storage.upload(`posts/${postID}`, img);
  }

  getPostPicture(postID: string): Observable<string> {
    return this.storage.ref(`posts/${postID}`).getDownloadURL();
  }

  getPost(postID: string): AngularFireObject<Post> {
    const path = `/posts/${postID}`;
    return this.db.object(path);
  }

  getPosts(page: number): AngularFireList<Post> {
    const postsRef = this.db.list<Post>('/posts/',ref => ref.limitToFirst(page * 20));
    return postsRef;
  }

  getPopularPosts(): AngularFireList<Post> {
    const postsRef = this.db.list<Post>('/posts/',ref => ref.limitToFirst(3));
    return postsRef;
  }
}
