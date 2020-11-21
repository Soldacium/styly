import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { ImagesService } from '../services/images.service';
import { Title } from '@angular/platform-browser';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  canvas;
  ctx;
  array;
  colorArray = [
    '#000000',
    '#444444',
    '#660066',
    '#FF5505',
    '#8030FA',

  ];

  offset = 0;
  postLength;
  percentage = 0;
  time = 100;


  postImg: string;

  constructor(private route: ActivatedRoute,
    private titleService: Title,
    private postsService: PostsService,
    private imageService: ImagesService) {

  }


  postID: string = '';
  postContent: Post;

  ngOnInit() {
    document.documentElement.scrollTop = 0
    this.route.queryParams.subscribe(params => {
      this.postID= params['postID'];
      

    });
    console.log(this.postID)
    this.setTitle(this.route.snapshot.paramMap.get('title'))
    this.getPostContent();
    
    this.essentials();
    this.animate();
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  getPostContent(){
    this.imageService.getPostPhoto(this.postID).subscribe(url => {
      this.postImg = url
      console.log(url)

    })      

    this.postsService.getPost(this.postID).valueChanges().subscribe((post: Post) => {
     console.log(this.postID, post)
      this.postContent = post;
    })
  }

  essentials() {
    this.canvas = document.getElementById('canvas');

    this.canvas.width = 80;
    this.canvas.height = 80;
    this.ctx = this.canvas.getContext('2d');

    const postContentLen = document.getElementById('post').offsetHeight;
    const postHeaderLen = document.getElementById('header').offsetHeight;
    this.postLength = postContentLen + postHeaderLen;


    let observer = new MutationObserver((mutations, me) => {
      const postContentLen = document.getElementById('post').offsetHeight;
      const postHeaderLen = document.getElementById('header').offsetHeight;
    })

    observer.observe(document, {
      childList: true,
      subtree: true
    });


    window.addEventListener('scroll', (e) => {
      this.offset = window.pageYOffset ;
      if(this.offset < this.postLength + 0.15 * window.innerHeight + 100){
        //console.log(this.postLength + 0.15 * window.innerHeight + 100)
        this.percentage = (this.offset )/(this.postLength + 0.15 * window.innerHeight + 100);
        this.time = 100;
      }
      //console.log(this.percentage, (document.body.clientHeight - window.innerHeight/2));   
    })


    window.addEventListener('resize', () => {
      //this.canvas.width = window.innerWidth;
      //this.canvas.height = window.innerHeight;
      const postContentLen = document.getElementById('post').offsetHeight;
      const postHeaderLen = document.getElementById('header').offsetHeight;
      this.postLength = postContentLen + postHeaderLen;
    });

    // run the animation
  }


  animate() {
    requestAnimationFrame(() => {this.animate(); });
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    

    // tslint:disable-next-line: prefer-for-of
    
    this.basicCircle(40,40,40,`hsla(180, 0%, 83%,${(this.time + 30)/100})`,2)
    this.basicCircle(40,40,40,`hsla(330, 73%, 50%,${this.time/100})`,this.percentage * 2)

    this.time -= 1;
    
    

    
  }

  basicCircle(x,y,radius,color,rad){
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(x,y);
    this.ctx.arc(x, y, radius, 0, rad * Math.PI);
    this.ctx.closePath();
    this.ctx.fill()


  }

  //hsl(180, 83%, 100%)

  progressCricle(){

  }
}
