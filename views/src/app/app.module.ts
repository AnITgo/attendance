import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StaffComponent } from './staff/staff.component';
//import { StaffInfoComponent } from './staff/staff-info/staff-info.component';
import { AdminComponent } from './admin/admin.component';
import { AdminInfoComponent } from './admin/admin-info/admin-info.component';
import { ApplyVacationComponent } from './staff/apply-vacation/apply-vacation.component';
import { MyVacationComponent } from './staff/my-vacation/my-vacation.component';
import { StaffCheckinComponent } from './staff/staff-checkin/staff-checkin.component';
import { CheckVacationComponent } from './admin/check-vacation/check-vacation.component';
import { CheckVacationInfoComponent } from './admin/check-vacation-info/check-vacation-info.component';
import { AddVacationTypeComponent } from './admin/add-vacation-type/add-vacation-type.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';

import { AttendanceRoutingModule } from './attendance-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StaffComponent,
    //StaffInfoComponent,
    AdminComponent,
    AdminInfoComponent,
    ApplyVacationComponent,
    MyVacationComponent,
    StaffCheckinComponent,
    CheckVacationComponent,
    CheckVacationInfoComponent,
    AddVacationTypeComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AttendanceRoutingModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
