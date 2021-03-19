import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import anime from 'animejs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass'],
  animations: []
})
export class BlogComponent implements OnInit {

  posts = [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1];
  pages = [1, 2, 3, 4, 5, 6, 7];
  pageActive = 0;
  parallax!: HTMLElement;

  animationsDone = {
    flipped: false,
  };

  cards!: NodeList;
  featuredPostsElements!: NodeList;
  constructor(private router: Router) { }


  ngOnInit(): void {
    this.parallax = document.getElementById('parallax') as HTMLElement;
    this.cards = document.querySelectorAll('.card');
    this.featuredPostsElements = document.querySelectorAll('.featured-post');
    this.addScroll();
  }

  addScroll(){
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

  animateFlip(){
    this.cards.forEach((card, i) => {
      anime({
        targets: card,
        duration: 600,
        delay: i * 40,
        rotateY: [0, 180],
        easing: 'easeInOutCirc'
      });
    });

    this.featuredPostsElements.forEach((post,i)=>{
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
