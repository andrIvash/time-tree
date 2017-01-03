/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddblockComponent } from './addblock.component';

describe('AddblockComponent', () => {
  let component: AddblockComponent;
  let fixture: ComponentFixture<AddblockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddblockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
