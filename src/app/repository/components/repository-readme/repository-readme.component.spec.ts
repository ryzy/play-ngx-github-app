/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RepositoryReadmeComponent } from './repository-readme.component';
import { SharedModule } from '../../../shared/shared.module';

describe('RepositoryReadmeComponent', () => {
  let component: RepositoryReadmeComponent;
  let fixture: ComponentFixture<RepositoryReadmeComponent>;
  let contentEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule ],
      declarations: [ RepositoryReadmeComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryReadmeComponent);
    component = fixture.componentInstance;
    component.readme = 'Readme Content';
    fixture.detectChanges();

    contentEl = fixture.debugElement.query(By.css('.content')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(contentEl.textContent).toContain(component.readme);
  });
});
