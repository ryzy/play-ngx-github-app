import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class RepositoryPageComponent {
  public repository: Repository;

  public commits$: Observable<Commit[]>;
  public issues$: Observable<Issue[]>;
  public pulls$: Observable<PullRequest[]>;
  public readme$: Observable<string>;

  public error$: Observable<AppError>;

  constructor(private service: RepositoryService) {
    this.service.getRepository()
      .take(1)
      .subscribe((repository: Repository) => {
        this.repository = repository;

        this.readme$ = this.service.getReadme(repository, true);
        this.commits$ = this.service.getCommits(repository, true);
        this.issues$ = this.service.getIssues(repository, true);
        this.pulls$ = this.service.getPulls(repository, true);
    });

    this.error$ = this.service.getError();
  }
}
