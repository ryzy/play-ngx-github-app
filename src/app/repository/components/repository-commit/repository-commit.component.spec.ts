/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { RepositoryCommitComponent } from './repository-commit.component';
import { Commit } from '../../../shared/model/commit';
import { repositoryCommitsTestData } from '../../../../testing/fixtures/repository-commits';


describe('RepositoryCommitComponent', () => {
  let component: RepositoryCommitComponent;
  let fixture: ComponentFixture<RepositoryCommitComponent>;
  let titleEl: HTMLElement;

  const commit = <Commit>repositoryCommitsTestData[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule ],
      declarations: [ RepositoryCommitComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryCommitComponent);
    component = fixture.componentInstance;
    component.commit = commit;
    fixture.detectChanges();

    titleEl = fixture.debugElement.query(By.css('h2')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(titleEl.textContent).toContain(commit.commit.message);
  });
});
