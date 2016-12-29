import { Component, OnInit,HostListener,ElementRef,Renderer} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login.service';
import {UserService} from '../../user.service';
import { Observable } from 'rxjs/Observable';
import {User} from '../../user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

	users:User[];
	selectUsers:User;

  constructor(
		private elementRef: ElementRef, 
		private renderer: Renderer,
		private router: Router,
	    private route: ActivatedRoute,
		private loginService: LoginService,
		private userService:UserService
  	) {
		renderer.listen(elementRef.nativeElement, 'click', (event) => {
	    	//console.log(event);
	    });
  	 }

	ngOnInit() {
  	this.getUsers();
  }
  	ngOnChange(){
  		this.getUsers();
  	}
  	ngAfterContentInit(){
  		this.getUsers();
  	}
	getUsers():void{
  	this.userService
  	.getUsers()
  	.then(users=>this.users=users);
  }
	// gotoDetail(user: User): void {
 //    console.log('user'+user);
 //    this.userService.getUser(user);
 //    //this.router.navigate(['/check-vainfo', _id]);
 //  }  
  add(user:User){
  	this.userService.add_User(user);
  }
  edit(user:User){
  	this.userService.editUser0(user);
  }
  delete(user:User){
  	console.log('user'+user);
  	this.userService.deteleUser(user);
  }
  

}
