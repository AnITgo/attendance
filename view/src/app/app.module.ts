import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StaffComponent } from './staff/staff.component';
import { ABComponent } from './a-b/a-b.component';
import { ACComponent } from './a-b/a-c/a-c.component';
import { StaffinfoComponent } from './staff/staffinfo/staffinfo.component';
import { StaffvacationComponent } from './staff/staffvacation/staffvacation.component';
import { StaffvocationComponent } from './staff/staffvocation/staffvocation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StaffComponent,
    ABComponent,
    ACComponent,
    StaffinfoComponent,
    StaffvacationComponent,
    StaffvocationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
