/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyVacationComponent } from './my-vacation.component';

describe('MyVacationComponent', () => {
  let component: MyVacationComponent;
  let fixture: ComponentFixture<MyVacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVacationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
