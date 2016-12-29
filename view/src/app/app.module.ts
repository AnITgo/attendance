import './rxjs-extensions';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { AlertModule } from 'ng2-bootstrap/alert';
import { PaginationModule } from 'ng2-bootstrap';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AttendanceService} from './attendance.service';
import {LoginService} from './login.service';
import {CookieService} from 'angular2-cookie/services';
import {VacationService} from './vacation.service';
import {UserService} from './user.service';


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
import { SuperadminComponent } from './superadmin/superadmin.component';
import { AddStaffComponent } from './superadmin/add-staff/add-staff.component';
import { AddUserComponent } from './superadmin/add-user/add-user.component';
import { EditUserComponent } from './superadmin/edit-user/edit-user.component';
import { ListUsersComponent } from './superadmin/list-users/list-users.component';


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
    AdminCheckVainfoComponent,
    SuperadminComponent,
    AddStaffComponent,
    AddUserComponent,
    EditUserComponent,
    ListUsersComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    DatepickerModule.forRoot(),
    PaginationModule,
    AttendanceRoutingModule
  ],
  providers: [
  AttendanceService,
  LoginService,
  VacationService,
  CookieService,
  UserService,
   { provide: APP_BASE_HREF, useValue: '/' }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
