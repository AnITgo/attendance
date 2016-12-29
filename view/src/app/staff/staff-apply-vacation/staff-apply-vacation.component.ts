import { Component, OnInit,HostListener,ElementRef,Renderer} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login.service';
import {VacationService} from '../../vacation.service';
import { Observable } from 'rxjs/Observable';
import { Leave} from '../../leave';
import {CookieService} from 'angular2-cookie/services';
import {User} from '../../user';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';

import { DatepickerModule } from 'ng2-bootstrap/datepicker';

@Component({
  selector: 'app-staff-apply-vacation',
  templateUrl: './staff-apply-vacation.component.html',
  styleUrls: ['./staff-apply-vacation.component.css']

})
export class StaffApplyVacationComponent implements OnInit {
	 	date = new Date();
	 	month = this.date.getMonth() + 1;
        cdate = this.date.getFullYear().toString() + this.month + this.date.getDate().toString()+this.date.getHours().toString()+this.date.getMinutes().toString();
	leavemodel=new Leave(this.cdate,this.loginService.user.uid,this.loginService.user.uname,this.loginService.user.userrole,this.loginService.user.department,this.loginService.user.base_wage,this.loginService.user.email,'','','','','未审核');
	//leavemodel:Leave;
	onLeaveSubmit() { 
		console.log('这是cookie测试usercookie'+JSON.stringify(this.cookieService.getObject('user')));
		console.log('这是cookie测试token'+JSON.stringify(this.cookieService.getObject('token')));
		console.log('这是cookie测试hasLogin'+JSON.stringify(this.cookieService.getObject('hasLogin')));
    console.log(this.leavemodel);
  	//console.log(this.leavemodel.ltime);
  	//this.getUsers();
  	//this.addUser(this.model);
  	this.addLeave(this.leavemodel);
  	
  }

  constructor(
		private elementRef: ElementRef, 
		private renderer: Renderer,
		private router: Router,
        private route: ActivatedRoute,
		private loginService: LoginService,
		private vacationService:VacationService,
		private cookieService:CookieService,
		private location:Location
	) {
	    renderer.listen(elementRef.nativeElement, 'click', (event) => {
	    	//console.log(event);
	    });
	}

	addLeave(data):void {
	  	this.vacationService
	  	.addLeave(data);
  }

  goBack(): void {
    this.location.back();
    this.vacationService.addleaveMsg='null';
  }

  ngOnInit() {
  }

}
