import { Component, OnInit,HostListener,ElementRef,Renderer} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login.service';
import {VacationService} from '../../vacation.service';
import { Observable } from 'rxjs/Observable';
import {Leave} from '../../leave';


@Component({
  selector: 'app-admin-check-vacation',
  templateUrl: './admin-check-vacation.component.html',
  styleUrls: ['./admin-check-vacation.component.css']
})
export class AdminCheckVacationComponent implements OnInit {

	leaves:Leave[];
	selectLeave:Leave;

  constructor(
		private elementRef: ElementRef, 
		private renderer: Renderer,
		private router: Router,
        private route: ActivatedRoute,
		private loginService: LoginService,
		private vacationService:VacationService
	) {
	    renderer.listen(elementRef.nativeElement, 'click', (event) => {
	    	//console.log(event);
	    });
	}

	getLeaves():void{
  	this.vacationService
  	.getLeaves()
  	.then(leaves=>this.leaves=leaves);
  }

  ngOnInit() {
  	this.getLeaves();
  }

  onSelect(leave: Leave): void {
    this.selectLeave = leave;
  }
  gotoDetail(leave: Leave): void {
    console.log('leave'+leave);
    this.vacationService.getLeave3(leave);
    //this.router.navigate(['/check-vainfo', _id]);
  }                  
                       


}

