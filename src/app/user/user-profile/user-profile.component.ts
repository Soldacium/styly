import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  public imagePath!: string;
  imgURL: any;
  public message!: string;

  file!: File;
  updating = false;

  user: User = {
    name: '',
    username: '',
    email: '',
    facebook: '',
    instagram: '',
    linkedIn: '',
    description: '',
    postsIDs: [],
    followers: 0,
    uid: ''
  };

  profileViewMode: 'edit' | 'view' = 'view';

  constructor(
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.authService.authUser().subscribe(user => {
      this.userService.getUser(user?.uid || '').valueChanges().subscribe((userData: User | null) => {
        if (userData){
          this.user = userData;
        }
      });
    });
  }

  changeProfileViewMode(): void{
    if (this.profileViewMode === 'view'){
      this.profileViewMode = 'edit';
    } else {
      this.profileViewMode = 'view';
      // this.updateProfile();
    }
  }

  kek(){
    
  }

  preview(files: any): void {

    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
    };
    this.file = files[0];
  }

  updateProfile(): void{
    this.updating = true;
    this.userService.updateUser(this.user).then(user => {
      console.log(user);
      if (this.file){
        this.userService.updateUserPicture(this.file, this.user.uid).then(pic => {
          console.log(pic);
          this.updating = false;
        });
      }else{
        this.updating = false;
      }
    });
  }





}
