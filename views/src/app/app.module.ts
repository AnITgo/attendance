import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StaffComponent } from './staff/staff.component';
import { StaffInfoComponent } from './staff/staff-info/staff-info.component';
import { AdminComponent } from './admin/admin.component';
import { AdminInfoComponent } from './admin/admin-info/admin-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StaffComponent,
    StaffInfoComponent,
    AdminComponent,
    AdminInfoComponent
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
