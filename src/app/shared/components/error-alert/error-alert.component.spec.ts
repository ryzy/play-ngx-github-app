/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { ErrorAlertComponent } from './error-alert.component';

describe('ErrorAlertComponent', () => {
  let component: ErrorAlertComponent;
  let fixture: ComponentFixture<ErrorAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorAlertComponent ],
      imports: [ MaterialModule.forRoot() ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create even when no error obj provided', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message', () => {
    component.error = {
      statusCode: 500,
      message: 'Some server error',
    };
    fixture.detectChanges();

    const contentEl: HTMLElement = fixture.debugElement.query(By.css('md-card-content')).nativeElement;
    expect(contentEl.textContent).toContain(component.error.message);
  });
});
