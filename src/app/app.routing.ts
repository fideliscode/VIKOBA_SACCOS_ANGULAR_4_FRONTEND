import {Routes, RouterModule} from "@angular/router";
import {GroupsComponent} from "./groups/groups.component";
import {NewGroupComponent} from "./new-group/new-group.component";
import {ModuleWithProviders} from "@angular/core";
import {SignupComponent} from "./signup/signup.component";
import {SigninComponent} from "./signin/signin.component";
import {UsersComponent} from "./users/users.component";
import {ContributionComponent} from "./contribution/contribution.component";
import { NewContributionComponent } from './new-contribution/new-contribution.component';
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {AuthGuard} from "./auth-guard.service";

const APP_ROUTES: Routes =[
{path: '', component: UsersComponent, canActivate: [AuthGuard]},
{path: 'new-group', component: NewGroupComponent, canActivate: [AuthGuard] },
{path: 'signup', component: SignupComponent, canActivate: [AuthGuard]},
{path: 'signin', component: SigninComponent},
{path: 'groups', component: GroupsComponent, canActivate: [AuthGuard]},
{path: 'report', component: ContributionComponent, canActivate: [AuthGuard]},
{path: 'newcontri', component: NewContributionComponent,  canActivate: [AuthGuard]}



];
export const routing:ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);