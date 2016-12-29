import { Injectable } from '@angular/core';
import { Headers,Http,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {User} from './user';
import { Observable }     from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class UserService {
	public addUserMsg='null';
	public edit_user:User[];
  constructor(
  	private router: Router,
    private route: ActivatedRoute,
  	private http:Http

  	) { }

	public addUser(data){
			console.log("111"+data);
	       var headers = new Headers();
	       headers.append('Content-Type', 'application/json');
	       let options = new RequestOptions({ headers: headers });
	       this.http.post('http://localhost:8080/api/manager/add_user', data, options).toPromise().then((response) => {
	         //do something...
	         if(response.json().success){
	         this.addUserMsg="添加成功";
	         console.log(response.json());
	         console.log(response.json().message);
	          this.router.navigateByUrl('/').then(() => {
			  this.router.navigateByUrl('/list-users');
			});
	         }else{
	         this.addUserMsg="添加失败";
	         console.log(response.json());
	         console.log(response.json().message);	
	         }
	      //return response;
	    });

	  }
	 public editUser0(user){
	 	this.edit_user=user;
	 	console.log("editUser0"+user);
	 	this.router.navigateByUrl('/edit-user');
	 }
	 // public editUser(user){
	 // 	this.edit_user=user;
	 // 		console.log("1111"+user);
	 // 	 	var headers = new Headers();
	 //       headers.append('Content-Type', 'application/json');
	 //       let options = new RequestOptions({ headers: headers });
	 //       this.http.post('http://localhost:8080/api/manager/update_user', user, options).toPromise().then((response) => {
	 //         //do something...
	 //         if(response.json().success){
	 //         this.addUserMsg="修改成功";
	 //         console.log(response.json());
	 //         console.log(response.json().message);
	 //          this.router.navigateByUrl('/').then(() => {
		// 	  this.router.navigateByUrl('/list-users');
		// 	})
	 //         }else{
	 //          this.router.navigateByUrl('/').then(() => {
		// 	  this.router.navigateByUrl('/list-users');
		// 	};
	 //         console.log("2222")
	 //         this.addUserMsg="修改失败";
	 //         console.log(response.json());
	 //         console.log(response.json().message);	
	 //         }
	 //      //return response;
	 //    });
	 // }
	 public editUser(user){
	 	this.edit_user=user;
	 	 var headers = new Headers();
	       headers.append('Content-Type', 'application/json');
	       let options = new RequestOptions({ headers: headers });
	       this.http.post('http://localhost:8080/api/manager/update_user', user, options).toPromise().then((response) => {
	         //do something...
	         if(response.json().success){
	         this.addUserMsg="修改成功";
	         console.log(response.json());
	         console.log(response.json().message);
	          this.router.navigateByUrl('/').then(() => {
			  this.router.navigateByUrl('/list-users');
			});
	         }else{
	         	
	         this.router.navigateByUrl('/').then(() => {
			  this.router.navigateByUrl('/list-users');
			});
	         this.addUserMsg="修改失败";
	         console.log(response.json());
	         console.log(response.json().message);
	         }
	      //return response;
	    });

	 }

	public getUsers():Promise<User[]>{
  	return this.http.get('http://localhost:8080/api/manager/users')
  		.toPromise()
  		.then(response => response.json() as User[])
  		.catch(this.handleError);
  }
		// getUser(data){
	 //    console.log("执行getUser");
	 //       var headers = new Headers();
	 //       headers.append('Content-Type', 'application/json');
	 //       let options = new RequestOptions({ headers: headers });
	 //       this.http.post('http://localhost:8080/api/userone', data, options).toPromise().then((response) => {
	 //         //do something...
	 //         console.log('response.json()'+response.json());
	        
	 //      //return response;
	 //    });

	 //  }
		deteleUser(user){
		console.log("执行deteleUser");
		var headers = new Headers();
	    headers.append('Content-Type', 'application/json');
	    console.log(user);
	    this.http.post('http://localhost:8080/api/manager/delete_user', user).toPromise().then((response) => {
	         //do something...
	         console.log('response.json()'+response.json());

	          this.router.navigateByUrl('/').then(() => {
			  this.router.navigateByUrl('/list-users');
			})
	    });
	}
	public add_User(user){
	 	this.edit_user=user;
	 	this.router.navigateByUrl('/add-user');


	 }

	private handleError(error :any):Promise<any>{
	  	console.error('an error occurred',error);
	  	return Promise.reject(error.message || error);
	  }

}
