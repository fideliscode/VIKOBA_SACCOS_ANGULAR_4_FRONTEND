import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import { AuthService }from "./auth.service";
import {Router} from "@angular/router";
import { User} from "./user.interface";

@Injectable()
export class GroupService{
    
     token: string;
     userRole: string;
     currentid:number;
     currentnames: string;
     username: string;
     loged=false;
     groupID:string;
     txt:string;
     invalid=false;
     currentemail:string;
     currentUser:User;
     kosa=false;

    constructor(private http: Http, private authservice: AuthService, private router: Router) {}
   
   TestSignin(email: string, password: string){
     const body = JSON.stringify({email: email,   password: password});
     const headers = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'});
     return this.http.post('http://127.0.0.1:8000/api/login', body, {headers: headers})
     .map(
     (response: Response)=> {
     this.txt=response.json().txt; 
     
     if(this.txt =="invalid_credentials") {
      this.invalid=true; return true; 
     }
     else{this.invalid=false; return false;
     }
 
      });

   }
   getValidity(){
this.kosa=this.invalid;
     return this.kosa;
   }
    AddContri(amount: number, user_id: number){
     const token = this.authservice.getToken();
     this.groupID =this.authservice.getGroup_id()
     const body = JSON.stringify({amount: amount, user_id: user_id, group_id:this.groupID});
     const headers = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'});
     return this.http.post('http://127.0.0.1:8000/api/admin/contributions?token=' + token, body, {headers:headers})
    }
    
    addGroup(saccosName: string, admin_email: string){
     const token = this.authservice.getToken();
     const body = JSON.stringify({saccosName: saccosName, admin_email: admin_email});
     const headers = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'});
     return this.http.post('http://127.0.0.1:8000/api/creategroup?token=' + token, body, {headers:headers})
    }	

  	getGroups(): Observable<any>
    {    const token = this.authservice.getToken();
	  return this.http.get('http://127.0.0.1:8000/api/viewgroups?token=' + token)
        .map(
	    (response: Response) => {return response.json().saccosGroups;});
    }

    updateGroup(id: number, newName: string, newEmail: string){
     const token = this.authservice.getToken();
     const body = JSON.stringify({saccosName: newName, admin_email: newEmail});
     const headers = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'});
     return this.http.put('http://127.0.0.1:8000/api/admin/editgroup/'+ id + '?token=' + token, body, {headers: headers})
    
    }

    updateAmount(amount: number, id: number, user_id: number, group_id: number){
     const token = this.authservice.getToken();
     const body = JSON.stringify({amount: amount, id: id, user_id: user_id, group_id: group_id});
     const headers = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'});
     return this.http.put('http://127.0.0.1:8000/api/admin/contribution/'+ id + '?token=' + token, body, {headers: headers})
    
    }

    
    deleteGroup(id: number){
     const token = this.authservice.getToken();
     return this.http.delete('http://127.0.0.1:8000/api/deletegroup/'+ id + '?token=' + token );
    }
    deleteAmount(id: number){
     const token = this.authservice.getToken();
      return this.http.delete('http://127.0.0.1:8000/api/admin/contribution/'+ id + '?token=' + token );
    }
    
    registerAdmin( fname: string, lname: string, email: string, phone: number, password: string){
     const token = this.authservice.getToken();
     const headers = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'});
     const body = JSON.stringify(
        {fname: fname,
         lname: lname,
         email: email, 
         phone: phone,
         password: password}
         );
     return this.http.post('http://127.0.0.1:8000/api/createadminuser?token=' + token, body, {headers: headers})
    }
   
    registerMember(
        fname: string,
        lname: string,
        email: string,
        phone: number,
        password: string)
     {
       
      const group_id = this.authservice.getGroup_id();
      const admin_email = this.authservice.getEmail();
      const token = this.authservice.getToken();
      const headers = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'});
      const body = JSON.stringify(
        {fname: fname,
         lname: lname,
         email: email, 
         admin_email: admin_email, 
         phone: phone,
         group_id: group_id, 
         password: password}
         );
    return this.http.post('http://127.0.0.1:8000/api/admin/createmember?token=' + token, body, {headers: headers})
    } 

    IsLoged(){
     this.userRole = this.authservice.getRole();
     if (!this.userRole) {
     return false;
     }
     else{
     return true;}
    }
    IsRole(){
     this.userRole = this.authservice.getRole();
     if (this.userRole==="AUTHOR") 
     { this.loged=true;
     return "AUTHOR";
      }
      else if (this.userRole==="ADMIN") 
      { this.loged=true;
      return "ADMIN";
      }
      else if(this.userRole=="MEMBER"){
      this.loged=true;
      return "MEMBER";
      } 
    }
  
   Auntheticated(){ 
     this.token = this.authservice.getToken();
     if (!this.token) {
     return false;
     }
     else{
     return true;}
    }
    updateUser(
    id: number,
    group_id: number,
    admin_email: string,
    fname: string,
    lname: string,
    email: string,
    phone: number
    )
    {const token = this.authservice.getToken();
    const body = JSON.stringify({
        group_id: group_id,
        admin_email: admin_email,
        fname: fname,
        lname:  lname,
        email: email,
        phone: phone});
    const headers = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'});
     return this.http.put('http://127.0.0.1:8000/api/admin/editmember/'+ id + '?token=' + token, body, {headers: headers})
    }
   
    updatePassword(userid: string, password: string){
        const token = this.authservice.getToken();
    const body = JSON.stringify({password: password});
    const headers = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'});
     return this.http.put('http://127.0.0.1:8000/api/editmemberpassword/'+ userid + '?token=' + token, body, {headers: headers})


    }




    storenames(user: User){
     this.currentnames= user.fname + ' '+ user.lname;
     this.currentemail=user.email;
     this.currentUser=user;
    }
    storeId(id: number){
     this.currentid = id;
    }
    getcurrentid(){
     return this.currentid;
    }
    getcurrentnames(){
     return this.currentnames;
    }
    getcurrentemail(){
        return this.currentemail;
    }
    getcurrentuser(){
        return this.currentUser;
    }
    deleteUser(id: number, admin_email: string){
     const token = this.authservice.getToken();
     return this.http.delete('http://127.0.0.1:8000/api/deletemember/' + admin_email+'/' + id + '?token=' + token );
    }
       
    getMembers(): Observable<any>{
     const token = this.authservice.getToken();
     const user_id = this.authservice.getUser_id();
     return this.http.get('http://127.0.0.1:8000/api/viewgroupmembers/' + user_id+ '?token=' + token)
     .map(response => response.json().members);
    }

    getProfile(): Observable<any>{
     const token = this.authservice.getToken();
     const user_id = this.authservice.getUser_id();
     return this.http.get('http://127.0.0.1:8000/api/showmember/' + user_id+ '?token=' + token)
     .map(
     (response: Response) => {return response.json().member;});
    }

    GetContri(id: number){
      const token = this.authservice.getToken();
      return this.http.get('http://127.0.0.1:8000/api/all_membercontr/' + id+ '?token=' + token)

        .map(response => response.json().contributions, (response1: Response) => response1.json().name);
    }
    GetJumla(id: number){
       const token = this.authservice.getToken();
       return this.http.get('http://127.0.0.1:8000/api/jumlacontr/' + id+ '?token=' + token)
       .map(response => response.json().sum);
    }
    getrepo(id: number, group_id:number){
      const token = this.authservice.getToken();
      return this.http.get('http://127.0.0.1:8000/api/createReport/'+id+'/'+group_id+ '?token=' + token)
      .map(response => response.json().report);
    }

}  