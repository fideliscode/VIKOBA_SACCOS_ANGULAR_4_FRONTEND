import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { GroupService }from "../group.service";
import { Http, Response, Headers } from "@angular/http";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private groupService: GroupService) { }

  ngOnInit() {}

  onRegisterMember(form: NgForm){
  	this.groupService.registerMember(
  		form.value.fname,
  	  form.value.lname, 
  		form.value.email, 
  		form.value.phone,
  		form.value.password,
  		)
  	.subscribe(
  		response => console.log(response),
  		err => console.error(err),
  		()=> alert('member created')
        );
  		form.reset();
  }
  onRegisterAdmin(form: NgForm){
    this.groupService.registerAdmin(
      form.value.fname,
      form.value.lname, 
      form.value.email, 
      form.value.phone,
      form.value.password,
      )
    .subscribe(
      response => console.log(response),
      err => console.error(err),
      ()=> alert('admin created')
        );
      form.reset();
  }

}
