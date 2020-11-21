import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { PostComponent } from './post/post.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { AccountComponent } from './account/account.component';

import { NavAccountComponent } from './account/nav-account/nav-account.component';
import { AccountProfileComponent } from './account/account-profile/account-profile.component';
import { AccountSavedComponent } from './account/account-saved/account-saved.component';
import { AccountMakePostComponent } from './account/account-make-post/account-make-post.component';
import { AccountOptionsComponent } from './account/account-options/account-options.component';
import { AccountPostsComponent } from './account/account-posts/account-posts.component';

import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

import { appRoutes } from '../routes';

import { PostsService } from './services/posts.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { ImagesService } from './services/images.service';
import { LoginGuard } from './guards/login.guard';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent,
    FooterComponent,
    PostComponent,
    ContactComponent,
    AboutComponent,
    LoginComponent,
    EventsComponent,
    AccountComponent,
    NavAccountComponent,
    AccountProfileComponent,
    AccountSavedComponent,
    AccountMakePostComponent,
    AccountOptionsComponent,
    AccountPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    
    // set up out app  on out firebase page, in env we need to rpovide api-key, name etc.
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
  ],
  providers: [AuthService, PostsService, UserService, ImagesService, LoginGuard, {provide: BUCKET, useValue: 'stylyblog.appspot.com'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
