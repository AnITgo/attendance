import { Component, OnInit,HostListener,ElementRef,Renderer} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login.service';
import {VacationService} from '../../vacation.service';
import { Observable } from 'rxjs/Observable';
import {Leave} from '../../leave';


@Component({
  selector: 'app-staff-vacation',
  templateUrl: './staff-vacation.component.html',
  styleUrls: ['./staff-vacation.component.css']
})
export class StaffVacationComponent implements OnInit {

	leaves:Leave[];

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

}
