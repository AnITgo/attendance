import { Component,OnInit,HostListener,ElementRef,Renderer} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login.service';
import {UserService} from '../../user.service';
import { Observable } from 'rxjs/Observable';
import {User} from '../../user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
	//edit_usermodel= new User(this.userService.edit_user.uid,this.userService.edit_user.uname,this.userService.edit_user.department,this.userService.edit_user.password,this.userService.edit_user.userrole,this.userService.edit_user.base_wage,this.userService.edit_user.email) ;
	//edit_usermodel=new User('','','','','','','','');
	edit_usermodel = this.userService.edit_user;
  constructor(
		private elementRef: ElementRef, 
		private renderer: Renderer,
		private router: Router,
        private route: ActivatedRoute,
		private loginService: LoginService,
		private userService:UserService
  	) { 
	    renderer.listen(elementRef.nativeElement, 'click', (event) => {
	    	console.log(event);
	    });
  }
	editUser(usermodel){
		this.userService.editUser(usermodel);
		//this.location.back();
	}

  ngOnInit() {
  }

}
