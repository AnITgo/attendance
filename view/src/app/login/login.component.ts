import { Component, OnInit } from '@angular/core';
import { User } from '../user';
//import {AttendanceService} from '../attendance.service';
import {LoginService} from '../login.service';
import { Headers,Http,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  //moduleId: './login.component',
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
  usermodel = new User('111111',"","wang","","","","","");
  submitted = false;
  onSubmit() { 
    console.log(this.usermodel.uid);
  	console.log(this.usermodel.password);
  	//this.getUsers();
  	//this.addUser(this.model);
    this.valiUser(this.usermodel);
    //console.log("函数返回值"+this.valiUser(this.model));
    //console.log("函数444返回值"+this.valiUser4(this.model));
    //this.loginService.valiUser3(this.model).then(data=>console.log(data));
    //console.log(this.loginService.valiUser3(this.model).then());
    
  	this.submitted = true; 
  }

  users:User[];
  user:User;
  constructor(
    private http:Http,
    private router: Router,
    private route: ActivatedRoute,
  	//private attendanceService : AttendanceService 
    private loginService:LoginService
    ) { }
  getUsers():void{
  	this.loginService
  	.getUsers()
  	.then(users=>this.users=users);
  }
  valiUser(data){
    //var aa;
    return this.loginService
    .valiUser3(data);
    //.then(user=>this.user);
    //.map(aa=>this.hasLogin);
    //.extractData(res: Response);
    //.map(aa=> console.log(aa));
    //console.log('compon输出'+aa)；

    //.extractData(res: Response);

  }

valiUser4(data){
       var headers = new Headers();
       headers.append('Content-Type', 'application/json');
       let options = new RequestOptions({ headers: headers });
       this.http.post('http://localhost:8080/api/auth', data, options).toPromise().then((response) => {
         console.log(response.json().success);
         if(response.json().success){
           //this.router.navigateByUrl("admin-info");
            this.router.navigate(['../staff']);
         }
        //do something...
      return response;
    });
  }


  addUser(data):void{
  	this.loginService
  	.addUser(data);
  }

  ngOnInit() {
  	
  	
  }

 



}
