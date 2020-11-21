import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { ImagesService } from '../services/images.service';
import { Post } from '../models/post.model';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  posts = []
  images;
  pages = [1,2,3,4,5,6]
  pageActive = 1;
  maxPage = 6;

  postss;
  postssImages = {};
  loadedImages = [];

  constructor(private router: Router,
    private postsService: PostsService,
    private imageService: ImagesService) { }

  ngOnInit() {
    this.images = [
      '/assets/images/posts-BG/cool1.jpg',
      '/assets/images/posts-BG/cool2.jpg',
      '/assets/images/posts-BG/cool3.jpg',
      '/assets/images/posts-BG/cool4.jpg',
      '/assets/images/posts-BG/cool5.jpg',
      '/assets/images/posts-BG/cool6.jpg',
      
    ]
    this.getPosts()

    const postsRef: AngularFireList <Post> = this.postsService.getPosts(1)
    this.postss = postsRef.valueChanges()
    this.getPictures(this.postss)

  }

  /***
   * How it works:
   * get ref to all displayed posts, see which are actually displayed
   * for each of them get thier image url adress and add it to the array
   */
  getPictures(postsRef : Observable<Post[]>){
    
    postsRef.subscribe((posts: Array<Post>) => {
      this.loadedImages = [];
      posts.forEach((post: Post) => {
        this.imageService.getPostPhoto(post.imageID).subscribe((url:string) => {
          const key = post.imageID;
          this.postssImages[key] = url;
          this.loadedImages.push(false)
          console.log(url)
        })        
      })

      
    })
  }

  loadedPic(index){
      this.loadedImages[index] = true;
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  viewPost(post: Post){
    this.router.navigate(['/post',post.title],  { queryParams: { postID: post.imageID }});
    console.log('hey')
  }

  getPosts(){
    this.posts = []
    for(let i= 0; i< 15; i++){
      var item = this.images[Math.floor(Math.random() * this.images.length)];
      this.posts.push(item)
    }
  }

  goToPage(page){
    this.pageActive = page;
    this.getPosts()

    document.documentElement.scrollTop = 1.1 * window.innerHeight;

  }

  prev(){
    if(this.pageActive > 1){
      this.pageActive -= 1;
      this.getPosts()
      document.documentElement.scrollTop = 1.1 * window.innerHeight;
    }
  }
  next(){
    if(this.pageActive < this.maxPage){
      this.pageActive += 1;
      this.getPosts()
      document.documentElement.scrollTop = 1.1 * window.innerHeight;
    }
  }
}
