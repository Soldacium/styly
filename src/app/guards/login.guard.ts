import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { from } from 'rxjs'

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, 
    private router: Router, 
    private userService: UserService){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> |  boolean {
      console.log(this.userService.userID)
      
      
      return from(this.userService.waitForAuth().then((user:firebase.User )=> {
      
        console.log(user)
        if(user !== undefined && user !== null){
          return true;
        }else{
          console.log('access denied!')
          this.router.navigate(['/login']);
          return false;
        }  
      }))
      /*
      return this.authService.getAuth().map(user => {
        return user ? true : false;
      })
            return this.userService.waitForAuth().then((user:firebase.User )=> {
      
        let userID = user.uid;
        if(userID!== undefined || userID !== null){
          return true;
        }else{
          console.log('access denied!')
          this.router.navigate(['/login']);
          return false;
        }  
      })
      */


  }
  
}
