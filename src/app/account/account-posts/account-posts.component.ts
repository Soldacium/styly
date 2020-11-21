import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { UserService } from '../../services/user.service';
import { ImagesService } from '../../services/images.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-account-posts',
  templateUrl: './account-posts.component.html',
  styleUrls: ['./account-posts.component.css']
})
export class AccountPostsComponent implements OnInit {

  myposts = [];
  posts = [];
  postImagesURLs = [];

  postyy;
  constructor(private router: Router,
              private postsService: PostsService,
              private userService: UserService,
              private imageService: ImagesService) { }

  ngOnInit() {
    for (let i = 0; i < 25; i++) {
      this.posts.push(i);
    }
    this.userService.waitForAuth().then((user: firebase.User ) => {
      console.log('heyy');
      let postIDs = this.postsService.getUserPostsIDs(user.uid)
      //console.log(this.postyy);
      //this.postyy = this.getPosts(user.uid)
      return postIDs.valueChanges().subscribe(ref => {
        
        
        ref.forEach((postID : string)=> {
          this.postsService.getPost(postID).valueChanges().subscribe((post:Post) => {
            if(post !== null){
              this.myposts.push(post)
            }
            
            
            console.log(this.myposts)
          })

          this.imageService.getPostPhoto(postID).subscribe(url => {
            this.postImagesURLs.push(url)
          })
        })
      })

      console.log(this.postImagesURLs)
      console.log(postIDs)
    });


  }
  /*

  getPosts(userID) {
    this.postsService.getUserPosts(userID).valueChanges()
    this.postsService.getUserPosts(userID).valueChanges().subscribe((ref) => {
      const postList = [];
      let postTitle: string, postImg;
      console.log(ref);
      ref.forEach(postID => {
        
        return this.postsService.getPost(postID).valueChanges().subscribe((post: Post) => {
          console.log(post.title);
          postTitle = post.title;
        });
        
       let array = [this.postsService.getPost(postID), this.imageService.getPostPhoto(postID)]

        return array

        postImg = this.imageService.getPostPhoto(postID);

        postList.push({postTitle:  postTitle, postImg: postImg});
      });
    //return postList;
    });

  }
  */

  editPost(post) {
    this.router.navigate(['/account/makePost']);
  }

  deletePost(post) {
    this.postsService.deletePost(post.imageID)
    this.myposts.splice(this.myposts.indexOf(post),1)
    /*
    this.myposts.forEach(post => {
      if(post.imageID == postID){
        console.log(post)
        this.myposts.splice(this.myposts.indexOf(post), 1 )
      }
    })
    */
  }

  newPost() {
    this.router.navigate(['/account/makePost']);
  }

}
