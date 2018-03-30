import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User} from "../user.interface";
import { GroupService} from "../group.service";
import {Response} from "@angular/http";
import { Contribution} from "../contribution.interface";
import { Router } from '@angular/router';
import {ContributionComponent} from '../contribution/contribution.component';
import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
@Input() i:number;
@Input()  user: User;


@Output() userDeleted = new EventEmitter<User>();
@Output() total = new EventEmitter<number>();
users: User[];
ready=false;
admin="ADMIN";
author="AUTHOR";

contributions: Contribution[];
editing = false;

editValue1= '';
editValue2= '';
editValue3= '';
editValue4: number;

status= false;


  constructor(private groupService: GroupService, private popup:Popup, private router: Router) { }

  ngOnInit() {
  }

 ongetreport(){
   this.groupService.storenames(this.user);
   this.groupService.storeId(this.user.id);
this.router.navigate(['/report']);
 }
   

     onEditUser()
     {
      this.editing = true;
      this.editValue1 = this.user.fname;
      this.editValue2 = this.user.lname;
      this.editValue3 = this.user.email;
      this.editValue4 = this.user.phone;
     
     }

     onUpdateUser()
     {
          this.groupService.updateUser(
          	this.user.id, 
          	this.user.group_id,
          	this.user.admin_email,
          	this.editValue1, 
          	this.editValue2,
          	this.editValue3,
          	this.editValue4,
          	
          	)
          .subscribe
          ( 
           
                         (user: Response)=>
                       {
                        this.user.fname = this.editValue1;
                        this.user.lname = this.editValue2;
                        this.user.email = this.editValue3;
                        this.user.phone = this.editValue4;
        
                         this.editValue1 = '';
                         this.editValue2 = '';
                         this.editValue3 = '';
                         this.editValue4 = null; 
                       }
                  
          );
          this.editing = false;
      }

     onCancelUser()
     {
	                       this.editValue1 = '';
                         this.editValue2 = '';
                         this.editValue3 = '';
                         this.editValue4 = null;
                         
        this.editing= false;
      }

      onDeleteUser()
      {
        
      
	      this.groupService.deleteUser(this.user.id, this.user.admin_email)
        .subscribe
        (
	        () =>{ this.userDeleted.emit(this.user);
                   console.log('User succesfull deleted');
      }
        );
        this.editing = false;
       
   
      }

      
      
     
     

}
