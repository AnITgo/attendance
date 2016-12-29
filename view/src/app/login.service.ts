import { Injectable } from '@angular/core';
import { Headers,Http,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {User} from './user'
import { Observable }     from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import {CookieService} from 'angular2-cookie/services';
import { VacationService} from './vacation.service';
import { Location } from '@angular/common';

@Injectable()
export class LoginService {
  public user : User;
  public hasLogin: boolean=false;
  public userName;
  public userRole;
  public loginMsg='null';
  private headers = new Headers({'Content-Type':'application/json'});
  private usersUrl = 'http://localhost:8080/api/users';


  constructor(
    private http:Http,    
    private router: Router,
    private route: ActivatedRoute,
    private vacationService:VacationService,
    private location:Location,
    private cookieService: CookieService) { }
  getUsers():Promise<User[]>{
  	return this.http.get(this.usersUrl)
  		.toPromise()
  		.then(response => response.json() as User[])
  		.catch(this.handleError);
  }

  setUserCookie(user){
    this.cookieService.put('uname',this.user.uname);
  }

  // put(key: string, value: string, options?: CookieOptionsArgs) {
  // this._cookieWriter()(key, value, options);
  // }

  setCookie(user){
    this.cookieService.putObject('user',this,user)
  }

  //   putObject(key: string, value: Object, options?: CookieOptionsArgs) {
  //   this.put(key, JSON.stringify(value), options);
  // }

  getToken(token){
    this.cookieService.getObject(token);
  }

  //   getObject(key: string): Object {
  //   let value = this.get(key);
  //   return value ? JSON.parse(value) : value;
  // }

  valiUser(data){
    var aaaa;
    var headers = new Headers();
       headers.append('Content-Type', 'application/json');
       return this.http.post('http://localhost:8080/api/auth', data, {
            headers: headers
            },)
            .map(res =>  res.json())
            .subscribe(
             aa => console.log(aa),
             err => this.handleError(err),
            () => console.log('前端控制台输出：验证用户 Complete')
       );
  }

    valiUser3(data){
       var headers = new Headers();
       headers.append('Content-Type', 'application/json');
       let options = new RequestOptions({ headers: headers });
       this.http.post('http://localhost:8080/api/auth', data, options).toPromise().then((response) => {
         //do something...
         //console.log(response.json().user.userrole);

         if(response.json().success){
           this.cookieService.putObject('user',response.json().user);
           this.cookieService.putObject('token',response.json().token);
           this.cookieService.putObject('hasLogin','true');
           console.log('这是cookie测试'+this.cookieService.getObject('user'));
          this.user=response.json().user;
           console.log('这是cookie测试usercookie'+JSON.stringify(this.cookieService.getObject('user')));
          //this.user=User.stringify(this.cookieService.getObject('user'));
          this.hasLogin=true;
          this.userName=response.json().user.uname;
          this.userRole=response.json().user.userrole;
          console.log(this.userRole);
          if(response.json().user.userrole=='员工'){
            this.router.navigate(['../staff-vacation']);
          }else if(response.json().user.userrole=='管理员'){

          }else{
            this.router.navigate(['../admin-check-vacation']);
          }
          
         }else{
           console.log(this.loginMsg);
           console.log(this.loginMsg!='null');
           this.loginMsg=response.json().message;
           console.log(response.json().message);
           console.log(this.loginMsg);
           console.log(this.loginMsg!='null');
         }
        
      //return response;
    });

  }


	valiUser2(data):Promise<User>{
	var hasLogin: boolean=false;
    var headers = new Headers();
       headers.append('Content-Type', 'application/json');
       let options = new RequestOptions({ headers: headers });
 return this.http.post('http://localhost:8080/api/auth', data, options)
             .toPromise()
             .then(response => response.json() as User)
             .catch(this.handleError);

    // return  this.http.post('http://localhost:8080/api/auth', data, {
    //         headers: headers
    //         },)
    // 		.map(this.extractData)
    //         .catch(this.handleError);
            //.map(res => res.json())
            //.subscribe(response);
		
           // console.log(res);

  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
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

  public logout():void{
    console.log("user login service logout...");
    this.cookieService.removeAll();
    this.hasLogin=false;
    this.loginMsg='null';
    
  this.vacationService.addleaveMsg='null';
  this.vacationService.checkinMsg='null';
  this.vacationService.checkServiceMsg='null';

  this.location.replaceState('','');
  //this.location.reload()
  }
  private handleError(error :any):Promise<any>{
  	console.error('an error occurred',error);
  	return Promise.reject(error.message || error);
  }

}
