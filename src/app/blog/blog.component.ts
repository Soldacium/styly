import { Component, OnInit } from '@angular/core';
import { AngularFireObject } from '@angular/fire/database';
import { Router } from '@angular/router';
import anime from 'animejs';
import { Observable } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { UserService } from '../services/user.service';
import { Post } from '../shared/models/post.model';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass'],
  animations: []
})
export class BlogComponent implements OnInit {

  posts!: Observable<Post[]>;
  popularPosts!: Observable<Post[]>;
  pages = [1, 2, 3, 4, 5, 6, 7];
  pageActive = 0;
  parallax!: HTMLElement;

  animationsDone = {
    flipped: false,
  };

  cards!: NodeList;
  featuredPostsElements!: NodeList;
  constructor(
    private router: Router,
    private postsService: PostsService,
    private userService: UserService) { }


  ngOnInit(): void {
    this.parallax = document.getElementById('parallax') as HTMLElement;
    this.cards = document.querySelectorAll('.card');
    this.featuredPostsElements = document.querySelectorAll('.featured-post');
    this.addScroll();
    this.posts = this.getPosts(1);
    this.popularPosts = this.getPopularPosts();
  }

  getPosts(page: number): Observable<Post[]>{
    return this.postsService.getPosts(1).valueChanges();
  }

  getPostUser(authorID: string): Observable<User | null>{
    return this.userService.getUser(authorID).valueChanges();
  }

  getPostPicture(postID: string): Observable<string>{
    return this.postsService.getPostPicture(postID);
  }

  getPopularPosts(): Observable<Post[]>{
    return this.postsService.getPopularPosts().valueChanges();
  }

  addScroll(): void{
    window.addEventListener('scroll', (e) => {
      this.parallax.style.top = 0.3 * window.scrollY + 'px';
      if (window.scrollY / window.innerHeight <= 0.3 && this.animationsDone.flipped){
        this.animateUnflip();
        this.animationsDone.flipped = !this.animationsDone.flipped;
      }
      if (window.scrollY / window.innerHeight > 0.3 && !this.animationsDone.flipped){
        this.animateFlip();
        this.animationsDone.flipped = !this.animationsDone.flipped;
      }
    });
  }

  animateFlip(): void{
    this.cards.forEach((card, i) => {
      anime({
        targets: card,
        duration: 600,
        delay: i * 40,
        rotateY: [0, 180],
        easing: 'easeInOutCirc'
      });
    });

    this.featuredPostsElements.forEach((post, i) => {
      anime({
        targets: post,
        duration: 500,
        delay: this.featuredPostsElements.length * 80,
        top: ['0%', '-100%'],
        easing: 'easeInOutCirc'
      });
    });
  }

  animateUnflip(): void {
    this.cards.forEach((card, i) => {
      anime({
        targets: card,
        duration: 600,
        delay: (this.cards.length - i) * 40,
        rotateY: [180, 0],
        easing: 'easeInOutCirc'
      });
    });

    this.featuredPostsElements.forEach((post, i) => {
      anime({
        targets: post,
        duration: 500,
        delay: this.featuredPostsElements.length * 80,
        top: ['-100%', '0%'],
        easing: 'easeInOutCirc'
      });
    });
  }

  prev(): void {

  }

  next(): void {

  }

  goToPage(page: number): void {

  }

  viewPost(post: any): void {
    this.router.navigate(['/post']);
  }
}
