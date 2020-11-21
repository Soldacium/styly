import { Routes } from '@angular/router';
import { AccountComponent } from './app/account/account.component';
import { MainComponent } from './app/main/main.component';
import { LoginComponent } from './app/login/login.component';
import { FooterComponent } from './app/footer/footer.component';
import { EventsComponent } from './app/events/events.component';
import { ContactComponent } from './app/contact/contact.component';
import { AboutComponent } from './app/about/about.component';
import { AccountProfileComponent } from './app/account/account-profile/account-profile.component';
import { AccountOptionsComponent } from './app/account/account-options/account-options.component';
import { AccountSavedComponent } from './app/account/account-saved/account-saved.component';
import { AccountPostsComponent } from './app/account/account-posts/account-posts.component';
import { AccountMakePostComponent } from './app/account/account-make-post/account-make-post.component';
import { PostComponent } from './app/post/post.component';
import { LoginGuard } from './app/guards/login.guard';

export const appRoutes: Routes = [
    {path: '', component: MainComponent, data: {animation: 'basic'}},
    {path: 'login', component: LoginComponent, data: {animation: 'basic'}},
    {path: 'events', component: EventsComponent, data: {animation: 'basic'}},
    {path: 'contact', component: ContactComponent, data: {animation: 'basic'}},
    {path: 'about', component: AboutComponent, data: {animation: 'basic'}},
    {path: 'account', component: AccountComponent, data: {animation: 'basic'}, canActivate: [LoginGuard], children: [
        {
            path: '',
            redirectTo: 'profile', pathMatch: 'full'
        },
        {
            path: 'profile',
            component: AccountProfileComponent,
        },
        {
            path: 'options',
            component: AccountOptionsComponent,
        },
        {
            path: 'saved',
            component: AccountSavedComponent,
        },
        {
            path: 'posts',
            component: AccountPostsComponent, 
        },
        {
            path: 'makePost',
            component: AccountMakePostComponent,
        }
    ]},
    
    {
        path: 'post/:title',
        component: PostComponent //, data: {animation: 'basic'}
        
    },
    {
        path: '**',
        component: MainComponent
    }
];