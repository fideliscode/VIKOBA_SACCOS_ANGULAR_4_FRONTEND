import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group} from "../group.interface";
import { GroupService} from "../group.service";
import {Response} from "@angular/http";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

@Input() i: number;
@Input()  group: Group;
@Output() groupDeleted = new EventEmitter<Group>();
groups: Group[];
editing = false;
editValue1= '';
editValue2= '';
status= false;
author="AUTHOR";


  constructor(private groupService: GroupService) { }

  ngOnInit() {
  }
     onEdit()
     {
      this.editing = true;
      this.editValue1 = this.group.saccosName;
      this.editValue2 = this.group.admin_email;
     }

     onUpdate()
     {
          this.groupService.updateGroup(this.group.id, this.editValue1, this.editValue2)
          .subscribe
          (
           
                         (group: Response)=>
                       {
                         this.group.saccosName = this.editValue1;
                         this.group.admin_email = this.editValue2;
                         this.editValue1= '';
                         this.editValue2= '';
                       }
                  
          );
          this.editing = false;
      }

     onCancel()
     {
	      this.editValue1= '';
	      this.editValue2= '';
        this.editing= false;
      }

      onDelete()
      {
        
      
	      this.groupService.deleteGroup(this.group.id)
        .subscribe
        (
	        () =>{ this.groupDeleted.emit(this.group);
          console.log('Group succesfull deleted');
      }
        );
        this.editing = false;
       
   
   } 

}
