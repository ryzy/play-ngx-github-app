import { Component, OnInit } from '@angular/core';
import { Repository } from '../../shared/model/repository';
import { RepositoryService } from '../services/repository.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

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
  public readme$: Observable<string|undefined>;

  constructor(
    private repositoryService: RepositoryService
  ) { }

  public ngOnInit(): void {
    // Although we could take the current repository from the
    // ActivatedRoute.snapshot.data['repository'] (@see RepositoryResolve
    // from the route config), we prefer to take it from the global state store,
    // to keep things consistent and always use the store as a single source of truth.
    this.repositoryService.getRepository()
      // Skip if we don't have a valid repository here
      // which might happen if the repository could not be loaded
      // e.g. due to 404 Not Found error.
      .filter((repository: Repository) => !!repository)
      // End this subscription after taking the 1st Repository
      .take(1)
      .subscribe((repository: Repository) => {
        this.repository = repository;

        this.readme$ = this.repositoryService.getReadme(repository, true);
        this.commits$ = this.repositoryService.getCommits(repository, true);
        this.issues$ = this.repositoryService.getIssues(repository, true);
        this.pulls$ = this.repositoryService.getPulls(repository, true);
    });
  }
}
