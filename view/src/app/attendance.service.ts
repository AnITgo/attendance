import { Injectable } from '@angular/core';
import { Headers,Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {User} from './user'

@Injectable()
export class AttendanceService {

  private headers = new Headers({'Content-Type':'application/json'});
  private usersUrl = 'http://localhost:8080/api/users';

  constructor(private http:Http) { }
  getUsers():Promise<User[]>{
  	return this.http.get(this.usersUrl)
  		.toPromise()
  		.then(response => response.json() as User[])
  		.catch(this.handleError);
  }

  valiUser(data){
    var headers = new Headers();
       headers.append('Content-Type', 'application/json');
       this.http.post('http://localhost:8080/api/auth', data, {
            headers: headers
            })
            .map(res => res.json())
            .subscribe(
             data => console.log(data),
             err => this.handleError(err),
            () => console.log('验证用户 Complete')
       );
  }

  addUser(data){
       // var username = data.username;
       // var password = data.password; 
       // var creds = "username=" + username + "&password=" + password + "&extra=color";
       var headers = new Headers();
       headers.append('Content-Type', 'application/json');
       this.http.post('http://localhost:3000/user', data, {
            headers: headers
            })
            .map(res => res.json())
            .subscribe(
             data => console.log(data),
             err => this.handleError(err),
            () => console.log('addUser Complete')
       );
    }

  private handleError(error :any):Promise<any>{
  	console.error('an error occurred',error);
  	return Promise.reject(error.message || error);
  }

}
