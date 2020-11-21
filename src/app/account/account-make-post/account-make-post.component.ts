import { Component, OnInit } from '@angular/core';
import { CKEditorModule } from 'ckeditor4-angular';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-account-make-post',
  templateUrl: './account-make-post.component.html',
  styleUrls: ['./account-make-post.component.css']
})
export class AccountMakePostComponent implements OnInit {
  
  public imagePath;
  imgURL: any;
  public message: string;

  file;
  posted = false;
 

  
  public model = {
    title: 'a post',
    editorData: '<p>Your post content</p>'
  };
  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.imgURL= 'assets/icons/flower.svg'
    

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
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }


  savePost(){
    console.log(this.model.editorData)
    //this.postsService.addPost(this.model.editorData, 12)
    this.posted = true;
    
    if(this.imagePath.length > 0){
      console.log(this.imagePath)
      this.postsService.addPost(this.model.title,this.model.editorData,1,this.imagePath[0])
      
    }
    

    
  }

  clickImage(){
    document.getElementById('selectedFile').click()
  }
}
