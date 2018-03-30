import { Component, OnInit, Input } from '@angular/core';
import { User} from "../user.interface";
import { Contribution} from "../contribution.interface";
import {Popup} from 'ng2-opd-popup';
import { GroupService} from "../group.service";
import {AuthService} from "../auth.service"
import { Router } from '@angular/router';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.css']
})
export class ContributionComponent implements OnInit {
	
	@Input() user_id: number;
	contributions: Contribution[] = [];
  contribution: Contribution;
	ready=false;
	authority=false;
  sum: string;
  palcelabel= 'view report';
  footer=false;
  editing=false;
  editValue: number;
  amountId: number;
  amountuser_id:number;
  amountgroup_id:number;
  user:User;
  currentname: string;
  user_id_string: string;
  group_id: number;
  name: string;
  group_id_string: string;
  currentemail:string;
  realcurrentemail:string;
  loginemail:string;
  change=false;
  amekosea:boolean;
  kosa:boolean;
  readytochange=false;
  showmismach=false;
  formchange=false;
  userid:string;
  showsuccess=false;


  constructor(private groupService: GroupService,
   private popup:Popup,
    private AuthService: AuthService,
    private router: Router) {
   
   this.currentname=this.groupService.getcurrentnames();
   this.user_id=this.groupService.getcurrentid();
   
    if (!this.user_id && !this.currentname) {
        this.palcelabel='pick a member';
        this.router.navigate(['/']);
     }
     else{
        this.ready=true;
        this.groupService.GetContri(this.user_id)
        .subscribe(
        (contributions: Contribution[]) => this.contributions = contributions, 
        (name: string) => this.name = name);
      
        this.groupService.GetJumla(this.user_id)
        .subscribe(
        (sum: string)=> this.sum = sum,); 
        

         
       } 
    

  }

  ngOnInit() {
   
  }
  onshowsuccess(){
    this.showsuccess=false;
    this.ongoingback();
  }
   ongoingback(){
     this.onBackingOff();
  
  this.amekosea=false;

  this.readytochange=false;
  this.showmismach=false;
  this.formchange=false;
     
   }

onbacktomembers(){
  this.ongoingback();
 this.router.navigate(['/']); 
}
   
  
 
   onBackingOff(){
     this.change=false;
  this.amekosea=false;
 
  this.readytochange=false;
  this.showmismach=false;
  this.formchange=false;
    //this.change=true;
    this.formchange=false;
   }
onChangePassword(){
  this.change=true;
  this.formchange=true;
}

   onBackingOffmore(){
    this.ongoingback();
    
   }
   
   onVerify(form: NgForm){
   
   this.formchange=false;
    this.realcurrentemail=this.AuthService.getEmail();  
    this.groupService.TestSignin(this.realcurrentemail, form.value.password)
    .subscribe();
    this.stillchecking();
    
    form.reset();

  }
  stillchecking(){
    this.amekosea=this.groupService.getValidity();
    if (!this.amekosea) {
      this.readytochange=true;
      this.formchange=false;
      this.kosa=false;

    }
    else if(this.amekosea){
     this.readytochange=false;
     this.formchange=true;
     this.kosa=true;}
  }
 

 
 onPassChange(form: NgForm){
  
   if (form.value.password==form.value.confirmpassword) {
     this.formchange=false;
     this.showmismach=false;
     this.change=true;
     this.showsuccess=true;
     this.readytochange=false;
     this.userid=this.AuthService.getUser_id();
     this.groupService.updatePassword(
     this.userid,form.value.password)
     .subscribe();
     
      }
    else{
     this.showmismach=true;
     this.formchange=true;
     this.change=true;
   }
 }
  


 
  
        
   onAddingContri(){
    this.footer=true;
    this.editing=false;
  }
  onSubmit(form: NgForm){

    this.groupService.AddContri(form.value.amount, this.user_id)
    .subscribe(
()=> {

form.reset();
    this.footer=false;
    this.groupService.GetContri(this.user_id)
        .subscribe(
        (contributions: Contribution[]) => this.contributions = contributions, 
        (name: string) => this.name = name);
      
        this.groupService.GetJumla(this.user_id)
        .subscribe(
        (sum: string)=> this.sum = sum,);  

  }
  
      );
    
  }
  oncancel(){
   this.footer=false;
    this.editing=false;

    this.editValue=null;
    this.amountId=null;
    this.amountuser_id=null;
    this.amountgroup_id=null;
 }
 onedit(contribution: Contribution){
    this.editing=true;
    this.footer=false;
    this.editValue=Number(contribution.amount);
    this.amountId=Number(contribution.id);
    this.amountuser_id=Number(contribution.user_id);
    this.amountgroup_id=Number(contribution.group_id);
 }
 onUpdateAmount(){
   this.editing=false;

   this.groupService.updateAmount(
     this.editValue, this.amountId, this.amountuser_id, this.amountgroup_id
     ).subscribe(
     ()=> {
        this.groupService.GetContri(this.user_id)
        .subscribe(
        (contributions: Contribution[]) => this.contributions = contributions, 
        (name: string) => this.name = name);
      
        this.groupService.GetJumla(this.user_id)
        .subscribe(
        (sum: string)=> this.sum = sum,);
     
       
     }
     );
  
 }

 onDeleteAmount(){
   this.groupService.deleteAmount(this.amountId)
   .subscribe(
    ()=> {
        this.groupService.GetContri(this.user_id)
        .subscribe(
        (contributions: Contribution[]) => this.contributions = contributions, 
        (name: string) => this.name = name);
      
        this.groupService.GetJumla(this.user_id)
        .subscribe(
        (sum: string)=> this.sum = sum,);
       
         }
     );
   this.editValue=null;
   this.editing=false;
 }
 
  }
  


