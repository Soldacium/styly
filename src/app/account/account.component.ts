import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  scrollUpElement : HTMLButtonElement;

  constructor() { }

  ngOnInit() {
    const display:HTMLDivElement = document.querySelector('.account-display')
    const nav: HTMLDivElement = document.querySelector('.account-nav');

    nav.style.height = `${window.innerHeight}px`
    nav.style.height = `${display.offsetHeight}px`

    this.scrollUpElement = document.querySelector('.scroll-up')
    
    

    let observer = new MutationObserver((mutations, me) => {
      nav.style.height = `${window.innerHeight}px`
      nav.style.height = `${display.offsetHeight}px`
    })

    observer.observe(display, {
      childList: true,
      subtree: true
    });

    document.addEventListener('scroll', ()=> {
      const offset = window.pageYOffset ;

      if(offset > window.innerHeight){
        this.scrollUpElement.style.display = 'block'
      }else{
        this.scrollUpElement.style.display = 'none'
      }
    })

    window.addEventListener('resize', () => {
      nav.style.height = `${window.innerHeight}px`
      nav.style.height = `${display.offsetHeight}px`
    })

  }

  scrollUp(){
    window.scrollTo(0,0);
  }

}
