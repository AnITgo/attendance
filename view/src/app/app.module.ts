import './rxjs-extensions';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AttendanceService} from './attendance.service';
import { StaffComponent } from './staff/staff.component';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { StaffInfoComponent } from './staff/staff-info/staff-info.component';
import { StaffVacationComponent } from './staff/staff-vacation/staff-vacation.component';
import { StaffApplyVacationComponent } from './staff/staff-apply-vacation/staff-apply-vacation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StaffComponent,
    StaffInfoComponent,
    StaffVacationComponent,
    StaffApplyVacationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AttendanceRoutingModule
  ],
  providers: [
  AttendanceService,
   { provide: APP_BASE_HREF, useValue: '/' }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
