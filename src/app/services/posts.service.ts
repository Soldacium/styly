import { Injectable, AfterContentChecked } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, fromEventPattern } from 'rxjs';
import * as firebase from 'firebase/app'

import { Comment } from '../models/comment.model';
import { Post } from '../models/post.model';


import { UserService } from './user.service';
import { AuthService } from '../services/auth.service';
import { ImagesService } from './images.service'

import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  //creating observables needed for other operations, later subscribe to 'em
  user: firebase.User;
  Comments: AngularFireList <Comment> ;
  Comment: Comment;
  userName: string;

  posts: AngularFireList <Post>;

  postID: string;



  constructor(
    public db: AngularFireDatabase,
    public imageService: ImagesService,
    public userService: UserService,
    private router: Router
    ) {

  }



  addPost(title: string, content: string, numPage: number, file){
    const timestamp = this.getTimeStamp();
    const email = this.userService.user.email;
    
    this.posts = this.getPosts(numPage);
    
    const id = uuidv4();
    const post = {
      title: title,
      author: this.userService.userName,
      authorID: this.userService.user.uid,
      authorLink: this.userService.userName,
      imageID: id,
      date: timestamp,
      content: content,
    }
    // make custom, unique id, so it is easy to find image associated with post

    //database reference + setting post with custom ID
    const posts = this.db.database.ref('/posts');
    posts.child(`${id}`).set(post)

    this.imageService.uploadPostPhoto(file, id).then(() =>
      this.router.navigate(['/account/posts'])
    );

    this.userService.updatePostList(id)
    console.log('working!')
  }

  deletePost(id : string){
    const posts = this.db.database.ref('/posts');
    posts.child(`${id}`).remove();
    this.imageService.deletePostPhoto(id);
    this.userService.deleteFromPostList(id)
  }

  updatePost(id:string, title:string, content,  numPage:number, file){
    const post = {
      title: title,
      author: this.userService.userName,
      authorID: this.userService.user.uid,
      authorLink: this.userService.userName,
      imageID: id,
      date: new Date,
      content: content,
    }

    const posts = this.db.database.ref('/posts');
    posts.child(`${id}`).set(post)

    this.imageService.uploadPostPhoto(file, id);

    this.userService.updatePostList(id)
    console.log('working!')
  }

  getPost(postID:string): AngularFireObject <Post>{
    return this.db.object(`posts/${postID}`)
  }

  getPosts(numPage: number): AngularFireList <Post>{
    return this.db.list(`/posts`, ref => {
      return ref.limitToLast(20).orderByKey()
    })
    /*
    return this.db.list(`/posts`, ref => {
      return ref.limitToLast(20).orderByKey();
    });
    */
  }

  getUserPostsIDs(userID: string) : AngularFireList <string> {
    let path;
    let postImg;
    let postTitle;
    if(userID){
      path = `users/${userID}/postsIDs`
    }else{
      path = `users/${this.userService.userID}/postsIDs`
    }
    console.log(path)
    return this.db.list(path)
  }

  getUserPosts(id?:string) { //for async operations : AngularFireList <any>
    let path;
    let postImg;
    let postTitle;
    if(id){
      path = `users/${id}/postsIDs`
    }else{
      path = `users/${this.userService.userID}/postsIDs`
    }
    console.log(path)
    this.db.list(path).valueChanges().subscribe(ref => {
      let postList = []
      console.log(ref)
      ref.forEach((postID : string ) => {
        this.getPost(postID).valueChanges().subscribe((post: Post) => {
          console.log(post.title)
          postTitle = post.title;
        })

        postImg = this.imageService.getPostPhoto(postID)

        postList.push({postTitle: postTitle, postImg: postImg})
      })
      return postList;
    })

    /*
    return this.db.list(path, ref => {
      return ref
    })
    */

    
  }

  // new way of getting messages as opposed to shown in tutorial, this gives us 
  // reference to our database with adress of /messages, which we can later modify
  // provided be are authorized (or, if real time storage is on, without permisson)
  getComments(): AngularFireList <Comment>  {
    // create message feed binding
    return this.db.list(`/posts/${this.postID}/comments`, ref => {
      return ref.limitToLast(5).orderByKey();
    });
  }

  getTimeStamp() {
    const now = new Date();
    
    const date = now.getUTCFullYear() + '/' +
    (now.getUTCMonth() + 1 ) + '/' 
    + now.getUTCDate();
    
    /*
    const time = now.getUTCHours() + '/' +
    now.getUTCMinutes() + '/' 
    + now.getUTCSeconds();
    */

    return date;
  }
}


