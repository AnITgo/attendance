import {NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {StaffComponent} from './staff/staff.component';
import {StaffInfoComponent} from './staff/staff-info/staff-info.component';
import {StaffVacationComponent} from './staff/staff-vacation/staff-vacation.component';
import { StaffApplyVacationComponent } from './staff/staff-apply-vacation/staff-apply-vacation.component';
import { StaffCheckinComponent } from './staff/staff-checkin/staff-checkin.component';
import { StaffWageComponent } from './staff/staff-wage/staff-wage.component';
import { AdminInfoComponent } from './admin/admin-info/admin-info.component';
import { AdminAddVatypeComponent } from './admin/admin-add-vatype/admin-add-vatype.component';
import { AdminCheckVacationComponent } from './admin/admin-check-vacation/admin-check-vacation.component';
import { AdminCheckVainfoComponent } from './admin/admin-check-vainfo/admin-check-vainfo.component';


const routes:Routes=[

{path:'staff',component:StaffComponent},
{path:'staff-info',component:StaffInfoComponent},
{path:'staff-vacation',component:StaffVacationComponent},
{path:'staff-apply-vacation',component:StaffApplyVacationComponent},
{path:'staff-checkin',component:StaffCheckinComponent},
{path:'staff-wage',component:StaffWageComponent},
{path:'admin-info',component:AdminInfoComponent},
{path:'admin-add-vacationtype',component:AdminAddVatypeComponent},
{path:'admin-check-vacation',component:AdminCheckVacationComponent},
{path:'admin-check-vacation-vacationinfo',component:AdminCheckVainfoComponent}

];

@NgModule({
	imports:[RouterModule.forRoot(routes)],
	exports:[RouterModule]
})
export class AttendanceRoutingModule{}