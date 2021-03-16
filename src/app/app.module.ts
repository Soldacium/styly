import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BlogComponent } from './blog/blog.component';
import { ButtonFancyComponent } from './shared/components/button-fancy/button-fancy.component';
import { ButtonRegularComponent } from './shared/components/button-regular/button-regular.component';
import { PaginatorComponent } from './shared/components/paginator/paginator.component';
import { PostComponent } from './post/post.component';
import { PostThumbnailComponent } from './shared/components/post-thumbnail/post-thumbnail.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './shared/components/search/search.component';
import { InputRegularComponent } from './shared/components/input-regular/input-regular.component';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserPostsComponent } from './user/user-posts/user-posts.component';
import { UserSavedComponent } from './user/user-saved/user-saved.component';
import { UserOptionsComponent } from './user/user-options/user-options.component';
import { QuillModule } from 'ngx-quill';
import { EditPostComponent } from './user/edit-post/edit-post.component';
import { PostThumbnailEditComponent } from './shared/components/post-thumbnail-edit/post-thumbnail-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BlogComponent,
    ButtonFancyComponent,
    ButtonRegularComponent,
    PaginatorComponent,
    PostComponent,
    PostThumbnailComponent,
    FooterComponent,
    LoginComponent,
    SearchComponent,
    InputRegularComponent,
    UserComponent,
    UserProfileComponent,
    UserPostsComponent,
    UserSavedComponent,
    UserOptionsComponent,
    EditPostComponent,
    PostThumbnailEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
