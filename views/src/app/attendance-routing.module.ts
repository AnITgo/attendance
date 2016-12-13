import {NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { StaffComponent } from './staff/staff.component';
import { ApplyVacationComponent } from './staff/apply-vacation/apply-vacation.component';
import { MyVacationComponent } from './staff/my-vacation/my-vacation.component';
import { StaffCheckinComponent } from './staff/staff-checkin/staff-checkin.component';
import { StaffInfoComponent } from './staff/staff-info/staff-info.component';
import { AdminComponent } from './admin/admin.component';
import { AddVacationTypeComponent } from './admin/add-vacation-type/add-vacation-type.component';
import { AdminInfoComponent } from './admin/admin-info/admin-info.component';
import { CheckVacationComponent } from './admin/check-vacation/check-vacation.component';
import { CheckVacationInfoComponent } from './admin/check-vacation-info/check-vacation-info.component';

const routes:Routes = [

{path:'login',component:LoginComponent},
{path:'changePassword',component:ChangePasswordComponent},
{path:'staff',component:StaffComponent},
{path:'admin',component:AdminComponent},

{path:'admin',component:AdminComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AttendanceRoutingModule{}