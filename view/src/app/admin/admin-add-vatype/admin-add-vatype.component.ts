import { Component,OnInit,HostListener,ElementRef,Renderer} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login.service';
import {VacationService} from '../../vacation.service';
import { Observable } from 'rxjs/Observable';
import {Vacation} from '../../vacation';

@Component({
  selector: 'app-admin-add-vatype',
  templateUrl: './admin-add-vatype.component.html',
  styleUrls: ['./admin-add-vatype.component.css']
})
export class AdminAddVatypeComponent implements OnInit {
	vacationmodel= new Vacation('','','');

  constructor(
		private elementRef: ElementRef, 
		private renderer: Renderer,
		private router: Router,
        private route: ActivatedRoute,
		private loginService: LoginService,
		private vacationService:VacationService
	) {
	    renderer.listen(elementRef.nativeElement, 'click', (event) => {
	    	console.log(event);
	    });
	}

	addVacationType(vacationmodel){
		this.vacationService.addVacationType(this.vacationmodel);

	}

  ngOnInit() {
  }

  private doLogout():void{
		this.loginService.logout();
		//this.router.navigateByUrl("home");
	}

}


