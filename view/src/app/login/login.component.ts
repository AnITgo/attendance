import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {AttendanceService} from '../attendance.service';

@Component({
  //moduleId: './login.component',
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model = new User('waitifsh','test');
  
  submitted = false;
  onSubmit() { 
  	console.log(this.model.password);
  	//this.getUsers();
  	//this.addUser(this.model);
    this.valiUser(this.model);
  	this.submitted = true; 
  }

  users:User[];

  constructor(
  	private attendanceService : AttendanceService ) { }
  getUsers():void{
  	this.attendanceService
  	.getUsers()
  	.then(users=>this.users=users);
  }
  valiUser(data):void{
    this.attendanceService
    .valiUser(data);
  }
  addUser(data):void{
  	this.attendanceService
  	.addUser(data);
  }

  ngOnInit() {
  	
  	
  }

 



}
