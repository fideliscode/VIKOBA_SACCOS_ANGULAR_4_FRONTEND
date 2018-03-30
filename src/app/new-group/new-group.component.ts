import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { GroupService} from "../group.service";

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {
author="AUTHOR";
  constructor(private groupService: GroupService) { }

  ngOnInit() {
  }
onSubmit(form: NgForm){
	this.groupService.addGroup(form.value.saccosName, form.value.admin_email )
	.subscribe(
	()=> alert('saccosGroup created')
	);
	form.reset();
}
}
