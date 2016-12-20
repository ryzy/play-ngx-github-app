import { Component, OnInit } from '@angular/core';
import { Repository } from '../../shared/model/repository';
import { RepositoryService } from '../services/repository.service';
import { Observable } from 'rxjs/Observable';
import { AppError } from '../../shared/model/app-error';
import { Commit } from '../../shared/model/commit';
import { Issue } from '../../shared/model/issue';
import { PullRequest } from '../../shared/model/pull-request';

@Component({
  selector: 'app-repository-page',
  templateUrl: './repository-page.component.html',
  styleUrls: ['./repository-page.component.scss']
})
export class RepositoryPageComponent implements OnInit {
  public repository: Repository;
  public commits$: Observable<Commit[]>;
  public issues$: Observable<Issue[]>;
  public pulls$: Observable<PullRequest[]>;
  public readme$: Observable<string>;
  public error$: Observable<AppError>;

  constructor(
    private repositoryService: RepositoryService
  ) { }

  public ngOnInit() {
    this.repositoryService.getRepository()
      .take(1)
      .subscribe((repository: Repository) => {
        this.repository = repository;

        this.readme$ = this.repositoryService.getReadme(repository, true);
        this.commits$ = this.repositoryService.getCommits(repository, true);
        this.issues$ = this.repositoryService.getIssues(repository, true);
        this.pulls$ = this.repositoryService.getPulls(repository, true);
    });

    this.error$ = this.repositoryService.getError();
  }
}
