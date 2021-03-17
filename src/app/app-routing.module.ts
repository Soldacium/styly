import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { EditPostComponent } from './user/edit-post/edit-post.component';
import { UserOptionsComponent } from './user/user-options/user-options.component';
import { UserPostsComponent } from './user/user-posts/user-posts.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserSavedComponent } from './user/user-saved/user-saved.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'blog'
  },
  {
    path: 'blog',
    component: BlogComponent,
    data: {animation: 'blog'}
  },
  {
    path: 'post',
    component: PostComponent,
    data: {animation: 'post'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {animation: 'login'}
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'profile',
        component: UserProfileComponent,
      },
      {
        path: 'posts',
        component: UserPostsComponent,
      },
      {
        path: 'saved',
        component: UserSavedComponent,
      },
      {
        path: 'edit-post',
        component: EditPostComponent,
      },
      {
        path: 'options',
        component: UserOptionsComponent,
      }
    ]
  },
  {
    path: '**',
    component: BlogComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled', // Add options right here
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
