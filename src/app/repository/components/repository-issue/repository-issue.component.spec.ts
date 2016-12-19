/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { RepositoryIssueComponent } from './repository-issue.component';
import { Issue } from '../../../shared/model/issue';
import { repositoryIssuesTestData } from '../../../../testing/fixtures/repository-issues';


describe('RepositoryIssueComponent', () => {
  let component: RepositoryIssueComponent;
  let fixture: ComponentFixture<RepositoryIssueComponent>;

  const issue = <Issue>repositoryIssuesTestData[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule ],
      declarations: [ RepositoryIssueComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryIssueComponent);
    component = fixture.componentInstance;
    component.issue = issue;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
