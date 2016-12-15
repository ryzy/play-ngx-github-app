/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { RepositoryCardComponent } from './repository-card.component';
import { Repository } from '../../../shared/model/repository';

export const sampleRepository: Repository = <Repository>{
  id: 2126244,
  name: 'bootstrap',
  full_name: 'twbs/bootstrap',
  owner: {
    login: 'twbs',
    id: 2918581,
    avatar_url: 'https://avatars.githubusercontent.com/u/2918581?v=3',
    html_url: 'https://github.com/twbs',
    starred_url: 'https://api.github.com/users/twbs/starred{/owner}{/repo}',
    repos_url: 'https://api.github.com/users/twbs/repos',
    type: 'Organization',
  },
  html_url: 'https://github.com/twbs/bootstrap',
  description: 'The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.',
  fork: false,
  issues_url: 'https://api.github.com/repos/twbs/bootstrap/issues{/number}',
  created_at: '2011-07-29T21:19:00Z',
  updated_at: '2016-12-14T16:21:38Z',
  pushed_at: '2016-12-14T13:31:16Z',
  ssh_url: 'git@github.com:twbs/bootstrap.git',
  clone_url: 'https://github.com/twbs/bootstrap.git',
  homepage: 'http://getbootstrap.com',
  size: 217052,
  stargazers_count: 104518,
  language: 'JavaScript',
  has_issues: true,
  open_issues: 300,
  forks: 47430,
};

describe('RepositoryCardComponent', () => {
  let component: RepositoryCardComponent;
  let fixture: ComponentFixture<RepositoryCardComponent>;
  let titleEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryCardComponent ],
      imports: [ MaterialModule.forRoot() ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryCardComponent);

    component = fixture.componentInstance;
    component.repository = sampleRepository;
    titleEl = fixture.debugElement.query(By.css('md-card-title')).nativeElement;

    fixture.detectChanges();
  });

  it('should work', () => {
    expect(component).toBeTruthy();
    expect(titleEl.textContent).toContain(sampleRepository.name);
  });
});
