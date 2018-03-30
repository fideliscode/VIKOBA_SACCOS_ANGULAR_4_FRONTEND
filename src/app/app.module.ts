import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Group } from "./group.interface";
import { User } from "./user.interface";
import {AuthGuard} from "./auth-guard.service";
import { AppComponent } from './app.component';
import { GroupComponent } from './group/group.component';
import { GroupsComponent } from './groups/groups.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { routing} from './app.routing';
import { GroupService} from "./group.service";
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthService} from "./auth.service";
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { ContributionComponent } from './contribution/contribution.component';
import { Routes, RouterModule} from "@angular/router";
import { PopupModule } from 'ng2-opd-popup';
import { NewContributionComponent } from './new-contribution/new-contribution.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    GroupsComponent,
    NewGroupComponent,
    SignupComponent,
    SigninComponent,
    UsersComponent,
    UserComponent,
    ContributionComponent,
    NewContributionComponent
  ],
  exports: [
    PopupModule],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    routing,
    PopupModule.forRoot(),
  
   
  ],
  providers: [GroupService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
