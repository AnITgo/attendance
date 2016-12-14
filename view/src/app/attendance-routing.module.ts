import {NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {StaffComponent} from './staff/staff.component';
import {StaffInfoComponent} from './staff/staff-info/staff-info.component';
import {StaffVacationComponent} from './staff/staff-vacation/staff-vacation.component';
import { StaffApplyVacationComponent } from './staff/staff-apply-vacation/staff-apply-vacation.component';

const routes:Routes=[

{path:'staff',component:StaffComponent},
{path:'staff-info',component:StaffInfoComponent},
{path:'staff-vacation',component:StaffVacationComponent},
{path:'staff-apply-vacation',component:StaffApplyVacationComponent}

];

@NgModule({
	imports:[RouterModule.forRoot(routes)],
	exports:[RouterModule]
})
export class AttendanceRoutingModule{}