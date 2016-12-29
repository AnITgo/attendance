import { Component,OnInit,HostListener,ElementRef,Renderer} from '@angular/core';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { LoginService } from '../../login.service';
import { VacationService} from '../../vacation.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { Leave } from '../../leave';

@Component({
	//moduleId: module.id,
  selector: 'app-admin-check-vainfo',
  templateUrl: './admin-check-vainfo.component.html',
  styleUrls: ['./admin-check-vainfo.component.css']
})
export class AdminCheckVainfoComponent implements OnInit {

	//leaves:Leave[] = this.vacationService.leaves;
	leaves:Leave[] ;
	public checkMsg='null';
  constructor(
		private elementRef: ElementRef, 
		private renderer: Renderer,
		private router: Router,
        private route: ActivatedRoute,
		private loginService: LoginService,
		private vacationService:VacationService,
		private location:Location
	) {
	    renderer.listen(elementRef.nativeElement, 'click', (event) => {
	    	console.log(event);
	    });
	}

  ngOnInit(): void {
    // this.route.params
    //   .switchMap((params: Params) => this.vacationService.getLeave('_id'))
    //   .subscribe(leave => this.leave = leave);

    this.leaves=this.vacationService.leaves;
    console.log("详细信息中的leave"+this.leaves);
    console.log("登录角色"+this.loginService.userRole);

  }

  private doLogout():void{
		this.loginService.logout();
		//this.router.navigateByUrl("home");
	}

	goBack(): void {
    this.location.back();
    this.checkMsg='null';
    this.vacationService.checkServiceMsg='null';
  }

  checkByDepManer(leave:Leave){
  	if(leave.lstatus=='审批成功'){
  		this.checkMsg='此请假已经被审批成功';
  	}else{
  		this.vacationService.checkLeaveByDepManer(leave);
  	}
  	
  }

  checkByFullManer(leave:Leave){

  	this.vacationService.checkLeaveByFullManer(leave);
  }

}
