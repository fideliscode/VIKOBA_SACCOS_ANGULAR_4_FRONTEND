import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Http, Response, Headers } from "@angular/http";
import { AuthService }from "../auth.service";
import { GroupService }from "../group.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  validity=false;
 



  constructor(private authservice: AuthService, private groupService: GroupService, private router: Router ) { }

  ngOnInit() {

  }

   onSignin(form: NgForm)
   {
    this.groupService.TestSignin(form.value.email, form.value.password)
    .subscribe( (invalid: boolean) => this.validity=invalid );

    if(this.groupService.getValidity()) {
      this.validity=false;
      this.router.navigate(['/signin']);  
      this.authservice.AdminSignin(form.value.email, form.value.password).subscribe(); 
       }
    else if(!this.groupService.getValidity()){ 
    this.validity=true;
    this.authservice.AdminSignin(form.value.email, form.value.password).subscribe(
      ()=> {this.router.navigate(['/']);});
    
       form.reset(); 
    
  }
   

}
}