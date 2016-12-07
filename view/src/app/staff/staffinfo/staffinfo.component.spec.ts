/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StaffinfoComponent } from './staffinfo.component';

describe('StaffinfoComponent', () => {
  let component: StaffinfoComponent;
  let fixture: ComponentFixture<StaffinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
