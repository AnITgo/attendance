import { Injectable } from '@angular/core';
import { Headers,Http,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {User} from './user';
import {Leave} from './leave';
import { Observable }     from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class VacationService {
  public addleaveMsg='null';
  public checkinMsg='null';
  public leaves:Leave[];
  public checkServiceMsg='null';

  constructor(
     private router: Router,
    private http:Http) { }
  public getLeaves():Promise<Leave[]>{
  	return this.http.get('http://localhost:8080/api/leaves')
  		.toPromise()
  		.then(response => response.json() as Leave[])
  		.catch(this.handleError);
  }

  public addLeave2(data){
  	//console.log('执行到了service');
  	var headers = new Headers();
       headers.append('Content-Type', 'application/json');
       this.http.post('http://localhost:3000/apply', data, {
            headers: headers
            })
            .map(res => res.json())
            .subscribe(
             data => console.log(data),
             err => this.handleError(err),
            () => console.log('add leave Complete')
       );

  }

    public addLeave(data){
       var headers = new Headers();
       headers.append('Content-Type', 'application/json');
       let options = new RequestOptions({ headers: headers });
       this.http.post('http://localhost:8080/api/application', data, options).toPromise().then((response) => {
         //do something...
         console.log(response.json());
         this.addleaveMsg=response.json().status;
       
        
      //return response;
    });

  }

    getLeave(lid: string): Promise<Leave> {
    return this.getLeaves()
               .then(leaves => leaves.find(leave => leave.lid === lid));
  }
  //   getLeave2(_id: string): Promise<Leave> {
  //   return this.getLeaves()
  //              .then(leaves => leaves.find(leave => leave._id === _id));
  // }

  public getLeave2(id:string):Promise<Leave>{
    return this.http.get('http://localhost:8080/api/leavelist/'+id)
      .toPromise()
      .then(response => response.json() as Leave)
      .catch(this.handleError);
  }

  getLeave3(data){
    console.log("执行getLeave3");
       var headers = new Headers();
       headers.append('Content-Type', 'application/json');
       let options = new RequestOptions({ headers: headers });
       this.http.post('http://localhost:8080/api/leaveone', data, options).toPromise().then((response) => {
         //do something...
         //console.log('service中的leave1)'+response.json().data());
        //console.log('service中的leave2)'+response.json().data);
         console.log('service中的leave3)'+response.json());
         //console.log('service中的leave4)'+response.json()[1]);
         this.leaves=response.json();
         this.router.navigateByUrl('/admin-check-vacation-vacationinfo');
         // if(response.json().success){
          
         // }
        
      //return response;
    });

  }

  checkLeaveByDepManer(data){
       console.log("执行checkLeaveByDepManer");
       var headers = new Headers();
       headers.append('Content-Type', 'application/json');
       let options = new RequestOptions({ headers: headers });
       this.http.post('http://localhost:8080/api/firstPermisson', data, options).toPromise().then((response) => {
        this.checkServiceMsg=response.json().lstatus;

         //do something...
         //console.log('service中的leave1)'+response.json().data());
        //console.log('service中的leave2)'+response.json().data);
         //console.log('service中的leave3)'+response.json());
         //console.log('service中的leave4)'+response.json()[1]);
         //this.leaves=response.json();
         //this.router.navigateByUrl('/admin-check-vacation-vacationinfo');
         // if(response.json().success){
          
         // }
        
      //return response;
    });
  }

   checkLeaveByFullManer(data){
            console.log("执行checkLeaveByFullManer");
       var headers = new Headers();
       headers.append('Content-Type', 'application/json');
       let options = new RequestOptions({ headers: headers });
       this.http.post('http://localhost:8080/api/secondPermission', data, options).toPromise().then((response) => {
         //do something...
         this.checkServiceMsg=response.json().lstatus;
    });
    
  }




  public addCheckin(data){
       var headers = new Headers();
       headers.append('Content-Type', 'application/json');
       let options = new RequestOptions({ headers: headers });
       this.http.post('http://localhost:8080/api/manager/ci_start', data, options).toPromise().then((response) => {
         //do something...
         console.log(response.json());
         this.checkinMsg=response.json().starttime;
       
        
      //return response;
    });

  }

  public addCheckinEnd(data){
       var headers = new Headers();
       headers.append('Content-Type', 'application/json');
       let options = new RequestOptions({ headers: headers });
       this.http.post('http://localhost:8080/api/manager/ci_end', data, options).toPromise().then((response) => {
         //do something...
         console.log(response.json());
         this.checkinMsg=response.json().endtime;
        
      //return response;
    });

  }

  public addVacationType(data){
       var headers = new Headers();
       headers.append('Content-Type', 'application/json');
       let options = new RequestOptions({ headers: headers });
       this.http.post('http://localhost:8080/api/manager/add_vaca', data, options).toPromise().then((response) => {
         //do something...
         console.log(response.json());
       
        
      //return response;
    });

  }



  private handleError(error :any):Promise<any>{
  	console.error('an error occurred',error);
  	return Promise.reject(error.message || error);
  }

}
