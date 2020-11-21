import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User, links } from '../../models/user.model';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit, OnChanges {

  infoEdit = false;
  descEdit = false;

  name: string;
  facebook: string;
  instagram: string;
  pinterest: string;
  email: string;

  desc: string;

  userInfo: any;

  message;
  imagePath;
  imgURL;
  constructor(private userService: UserService, private auth: AuthService) {

   }
  ngOnChanges() {
    if(this.userService.user == undefined){
      this.userService.waitForAuth().then((user: User )=> {
        
        this.userInfo = this.userService.getUser(this.auth.currentUserID).valueChanges()
        this.getInfo(this.userInfo)      
      })      
    }


  }

  ngOnInit() {
    this.userService.waitForAuth().then((user:firebase.User )=> {
      
      this.userInfo = this.userService.getUser(user.uid).valueChanges()
      this.getInfo(this.userInfo)    
      
      this.userService.getProfilePic(user.uid).subscribe((url: string) => {
        this.imgURL = url;
      });
    })

  }

  preview(files) {
    
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    this.updatePic(this.imagePath[0])
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  check(){

  }  
  getInfo(userInfo : Observable<any>){
    userInfo.subscribe((inf: User) => {
      console.log(inf)
      
      this.name = inf.displayName;
      this.facebook = inf.links.facebook;
      this.instagram = inf.links.instagram;
      this.pinterest = inf.links.pinterest;
      this.email = inf.links.email;

      this.desc = inf.desc;
      
    })
  }

  clickImage(){
    document.getElementById('selectedFile').click()
  }
  
/*
  async getInfo(userRef: Observable<User>){
    userRef.subscribe(a => console.log(a))
  }
  */

  updatePic(image){
    this.userService.updateProfilePicture(image).then(() => {
      console.log('picture updated')
      this.userService.getProfilePic().subscribe((url: string) => {
        this.imgURL = url;
        console.log('picture gotted')
      });
    })
  }


  updateInfo(){
    
    this.userService.updateUserInfo(this.name, this.facebook, this.instagram, this.pinterest, this.email, ).then(res => {
      this.infoEdit = !this.infoEdit;
    })
    this.getInfo(this.userInfo)
  }

  updateDesc(){
    
    this.userService.updateUserDesc(this.desc).then(res => {
      this.infoEdit = !this.infoEdit;
    })
    this.getInfo(this.userInfo)
  }

}
