import {Injectable} from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {Router} from "@angular/router";


@Injectable()
export class AuthService {
error: string;
 
  userRole: string;
  user_id: string;
  id: number;
  username:string;
  groupname:string;
  txt:string;
  invalid= false;
  
 
constructor (private http: Http, private router: Router ){}




AdminSignin(email: string, password: string)
{
	const body = JSON.stringify({email: email,   password: password});
	const headers = new Headers({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'});
	return this.http.post('http://127.0.0.1:8000/api/login', body, {headers: headers})
  .map(
    (response: Response)=> {
      
    	const userRole = response.json().userRole;
      const token = response.json().token;
      this.user_id = response.json().user_id;
      this.username=response.json().username;
      this.groupname=response.json().groupname;
      const group_id = response.json().group_id;
      const email = response.json().email;
      
       
   	const base64url = token.split('.')[1];
   	const base64 = base64url.replace('-', '+').replace('_', '/');
	 this.router.navigate(['/']); 
      
      return {token: token, userRole: userRole, email: email, user_id: 
        this.user_id, group_id: group_id, groupname: this.groupname,
        username: this.username };
    
   } 
	)
	.do(
       loginData => {
       	localStorage.setItem('token', loginData.token);
        localStorage.setItem( 'userRole', loginData.userRole );
        localStorage.setItem( 'user_id', loginData.user_id );
        localStorage.setItem( 'group_id', loginData.group_id );
        localStorage.setItem( 'username', loginData.username );
        localStorage.setItem( 'email', loginData.email );
        localStorage.setItem( 'groupname', loginData.groupname );

       }
       
		);
  
  }
  
   
  
  getToken(){
	       return localStorage.getItem('token');
  } 
  getGroupname(){
  
        return localStorage.getItem('groupname');
        }
  

  getRole(){
  
        return localStorage.getItem('userRole');
        }
  getUser_id(){
  this.user_id= localStorage.getItem('user_id');
        return localStorage.getItem('user_id');
        }
  getGroup_id(){
  
        return localStorage.getItem('group_id');
        }
        
  getusername(){
    return localStorage.getItem('username');
  }  
  getEmail(){
  
        return localStorage.getItem('email');
        }
 
  logout(){
    
     localStorage.removeItem('token');
     localStorage.removeItem('userRole');
     localStorage.removeItem('user_id');
     localStorage.removeItem('group_id');
     localStorage.removeItem('username');  
     localStorage.removeItem('email');
     this.router.navigate(['/signin']);
}

}