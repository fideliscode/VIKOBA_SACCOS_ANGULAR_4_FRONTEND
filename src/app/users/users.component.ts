import { Component, OnInit } from '@angular/core';
import { User} from "../user.interface";
import { Contribution} from "../contribution.interface";
import { GroupService} from "../group.service";
import {Response} from "@angular/http";
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: User;
  users: User[] = [];
  contribution: Contribution;
  contributions: Contribution[]=[];
  hide=true;
  count:number;
  looper=["me"];

  constructor(private groupService:GroupService) {
  this.hide=false;
    this.groupService.getMembers().subscribe(
    (members: User[]) => {
      this.users = members;
      this.count=members.length;},
    
    //(err) => console.error(err)
     );
    
      }

  ngOnInit() {
  }


   
  
  onDeletedUser(user: User) {
  const position = this.users.findIndex(
  (userEl: User)=>
  {
       return userEl.id == user.id;
  }
  );
  this.users.splice(position, 1);
}
}