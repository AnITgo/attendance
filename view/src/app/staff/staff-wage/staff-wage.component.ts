import { Component, OnInit,HostListener,ElementRef,Renderer} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../login.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-staff-wage',
  templateUrl: './staff-wage.component.html',
  styleUrls: ['./staff-wage.component.css']
})
export class StaffWageComponent implements OnInit {

  constructor(
		private elementRef: ElementRef, 
		private renderer: Renderer,
		private router: Router,
        private route: ActivatedRoute,
		private loginService: LoginService
	) {
	    renderer.listen(elementRef.nativeElement, 'click', (event) => {
	    	//console.log(event);
	    });
	}

  ngOnInit() {
  }

}
