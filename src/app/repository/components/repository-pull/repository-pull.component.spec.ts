/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { RepositoryPullComponent } from './repository-pull.component';
import { PullRequest } from '../../../shared/model/pull-request';
import { repositoryPullsTestData } from '../../../../testing/fixtures/repository-pulls';


describe('RepositoryPullComponent', () => {
  let component: RepositoryPullComponent;
  let fixture: ComponentFixture<RepositoryPullComponent>;
  let titleEl: HTMLElement;

  const pull = <PullRequest>repositoryPullsTestData[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule ],
      declarations: [ RepositoryPullComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryPullComponent);
    component = fixture.componentInstance;
    component.pull = pull;
    fixture.detectChanges();

    titleEl = fixture.debugElement.query(By.css('.card-header-title')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(titleEl.textContent).toContain(pull.title);
  });
});
