import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Post } from '../shared/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(    
    private db: AngularFireDatabase,
    private storage: AngularFireStorage) { }

  updatePost(post: Post){
    const path = `/posts/${post._id}`;
    this.db.object(``)
  }
}
