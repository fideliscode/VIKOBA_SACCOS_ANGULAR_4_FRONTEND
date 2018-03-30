import { Component, OnInit } from '@angular/core';
import { Group} from "../group.interface";
import { GroupService} from "../group.service";
import {Response} from "@angular/http";
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  group: Group;
  groups: Group[] = [];
  author="AUTHOR";
  count:number;
  

  constructor(private groupService:GroupService) { this.groupService.getGroups().subscribe(
    (saccosGroups: Group[]) => {this.groups = saccosGroups;
    this.count=saccosGroups.length;}, 
    (error: Response) => console.log(error));}

  ngOnInit() {
  }


    
  
  onDeleted(group: Group) {
  const position = this.groups.findIndex(
  (groupEl: Group)=>
  {
       return groupEl.id == group.id;
  }
  );
  this.groups.splice(position, 1);
  }
  }