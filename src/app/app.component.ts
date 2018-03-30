import { Component } from '@angular/core';
import { User} from "./user.interface";
import {Routes, RouterModule} from "@angular/router";
import { Group} from "./group.interface";

import { GroupsComponent } from './groups/groups.component';
import { AuthService }from "./auth.service";
import { GroupService }from "./group.service";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import { PopupModule } from 'ng2-opd-popup';
@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	author="AUTHOR";
	admin="ADMIN";
	member="MEMBER";

	constructor(private GroupService: GroupService, private AuthService: AuthService){
		
	}
	
	
     

}
   

   

