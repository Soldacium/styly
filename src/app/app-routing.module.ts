import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './post/post.component';

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
  /*
  {
    path: '**',
    component: BlogComponent
  }
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
