import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass']
})
export class BlogComponent implements OnInit {

  posts = [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1];
  pages = [1, 2, 3, 4, 5, 6, 7]
  pageActive = 0;
  parallax!: HTMLElement;
  constructor() { }


  ngOnInit(): void {
    this.parallax = document.getElementById('parallax') as HTMLElement;
    this.addScroll();
  }

  addScroll(){
    window.addEventListener('scroll', (e)=> {
      this.parallax.style.top = 0.3* window.scrollY + 'px'
    })
  }

  prev(){

  }

  next(){

  }

  goToPage(page: number){

  }

  viewPost(post: any){

  }
}
