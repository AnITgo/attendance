import { Component,OnInit,HostListener,ElementRef,Renderer} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login.service';
import {UserService} from '../../user.service';
import { Observable } from 'rxjs/Observable';
import {User} from '../../user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
	usermodel= new User('','','','','','','','');

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
	addUser(usermodel){
		this.userService.addUser(this.usermodel);
		//this.location.back();
	}

  ngOnInit() {
  }

}
