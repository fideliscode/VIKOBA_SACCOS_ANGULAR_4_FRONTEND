import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {GroupService } from './group.service';

@Injectable()
export class AuthGuard implements CanActivate {

constructor(private GroupService: GroupService){}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		return this.GroupService.Auntheticated();
}



}