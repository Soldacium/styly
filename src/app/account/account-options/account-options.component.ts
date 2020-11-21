import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-account-options',
  templateUrl: './account-options.component.html',
  styleUrls: ['./account-options.component.css']
})
export class AccountOptionsComponent implements OnInit {
  oldPass: string;
  newPass1: string;
  newPass2: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  changePassword(){
    if(this.newPass1 == this.newPass2){
      this.userService.updatePassword(this.oldPass,this.newPass1)
    }
  }

  deleteAccount(){
    this.userService.deleteUser()
  }

  clearPosts(){
    
  }

}
