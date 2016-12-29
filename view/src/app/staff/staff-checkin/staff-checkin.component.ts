import { Component, OnInit,HostListener,ElementRef,Renderer} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login.service';
import {VacationService} from '../../vacation.service';
import { Observable } from 'rxjs/Observable';
import {Checkin} from '../../checkin';

@Component({
  selector: 'app-staff-checkin',
  templateUrl: './staff-checkin.component.html',
  styleUrls: ['./staff-checkin.component.css']
})
export class StaffCheckinComponent implements OnInit {
	checkinmodel=new Checkin('','','','','');
	checkinStart(){

		console.log('checkinStart');
		var date = new Date();
        var month = date.getMonth() + 1;
        var cdate = date.getFullYear().toString() + month + date.getDate().toString();
        var starttime = date.getHours().toString()+date.getMinutes().toString(); 
        this.checkinmodel.cdate = cdate;
        this.checkinmodel.starttime=starttime;
        console.log('开始日期'+cdate);
        console.log('开始时间'+starttime);
        this.vacationService.addCheckin(this.checkinmodel);

	}

	checkinEnd(){
		var date = new Date();
        var month = date.getMonth() + 1;
        var cdate = date.getFullYear().toString() + month + date.getDate().toString();
        var endtime = date.getHours().toString()+date.getMinutes().toString(); 
        this.checkinmodel.cdate=cdate;
        this.checkinmodel.endtime=endtime;
        console.log('结束日期'+cdate);
        console.log('结束时间'+endtime);
        this.vacationService.addCheckinEnd(this.checkinmodel);

	}

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

  ngOnInit() {
  }

}
