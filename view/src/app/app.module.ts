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
import { AdminComponent } from './admin/admin.component';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { StaffInfoComponent } from './staff/staff-info/staff-info.component';
import { StaffVacationComponent } from './staff/staff-vacation/staff-vacation.component';
import { StaffApplyVacationComponent } from './staff/staff-apply-vacation/staff-apply-vacation.component';
import { StaffCheckinComponent } from './staff/staff-checkin/staff-checkin.component';
import { StaffWageComponent } from './staff/staff-wage/staff-wage.component';
import { AdminInfoComponent } from './admin/admin-info/admin-info.component';
import { AdminAddVatypeComponent } from './admin/admin-add-vatype/admin-add-vatype.component';
import { AdminCheckVacationComponent } from './admin/admin-check-vacation/admin-check-vacation.component';
import { AdminCheckVainfoComponent } from './admin/admin-check-vainfo/admin-check-vainfo.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    StaffComponent,
    StaffInfoComponent,
    StaffVacationComponent,
    StaffApplyVacationComponent,
    StaffCheckinComponent,
    StaffWageComponent,
    AdminInfoComponent,
    AdminAddVatypeComponent,
    AdminCheckVacationComponent,
    AdminCheckVainfoComponent
    
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
