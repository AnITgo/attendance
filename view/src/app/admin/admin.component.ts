import { Component,OnInit,HostListener,ElementRef,Renderer} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
		private elementRef: ElementRef, 
		private renderer: Renderer,
		private router: Router,
        private route: ActivatedRoute,
		private loginService: LoginService
	) {
	    renderer.listen(elementRef.nativeElement, 'click', (event) => {
	    	console.log(event);
	    });
	}

  ngOnInit() {
  }

  private doLogout():void{
		this.loginService.logout();
		//this.router.navigateByUrl("home");
	}

}