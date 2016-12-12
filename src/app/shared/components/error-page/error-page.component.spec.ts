/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { ErrorPageComponent } from './error-page.component';

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;

  let titleDe: DebugElement;
  let titleEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorPageComponent ],
      imports: [ MaterialModule.forRoot() ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    titleDe = fixture.debugElement.query(By.css('h1'));
    titleEl = titleDe.nativeElement;
  });

  it('should display error page', () => {
    expect(component).toBeTruthy();
    expect(titleEl.textContent).toContain('Error');
  });
});
