import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/startWith';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import { RepositoryFragment } from '../queries.types';
import { GitHubAPIService } from '../../shared/services/github-api.service';
import {
  ActionTypes, LoadReadmeAction, LoadReadmeCompleteAction,
  LoadErrorAction, LoadCommitsAction, LoadCommitsCompleteAction, LoadIssuesAction, LoadIssuesCompleteAction,
  LoadPullsAction, LoadPullsCompleteAction
} from './repository.actions';
import { Commit } from '../../shared/model/commit';
import { Issue } from '../../shared/model/issue';
import { PullRequest } from '../../shared/model/pull-request';


@Injectable()
export class RepositoryEffects {

  @Effect()
  public loadCommits$: Observable<Action> = this.actions$
    .ofType(ActionTypes.LOAD_COMMITS)
    .map((action: LoadCommitsAction) => <RepositoryFragment>action.payload )
    .switchMap((repository: RepositoryFragment) => {
      return this.gitHubAPIService.retrieveRepositoryCommits(repository.nameWithOwner)
        .map((commits: Commit[]) => new LoadCommitsCompleteAction(commits))
        .catch((error: Response) => Observable.of(new LoadErrorAction(error)));
    })
  ;

  @Effect()
  public loadIssues$: Observable<Action> = this.actions$
    .ofType(ActionTypes.LOAD_ISSUES)
    .map((action: LoadIssuesAction) => <RepositoryFragment>action.payload )
    .switchMap((repository: RepositoryFragment) => {
      return this.gitHubAPIService.retrieveRepositoryIssues(repository.nameWithOwner)
        .map((issues: Issue[]) => new LoadIssuesCompleteAction(issues))
        .catch((error: Response) => Observable.of(new LoadErrorAction(error)));
    })
  ;

  @Effect()
  public loadPulls$: Observable<Action> = this.actions$
    .ofType(ActionTypes.LOAD_PULLS)
    .map((action: LoadPullsAction) => <RepositoryFragment>action.payload )
    .switchMap((repository: RepositoryFragment) => {
      return this.gitHubAPIService.retrieveRepositoryPulls(repository.nameWithOwner)
        .map((pulls: PullRequest[]) => new LoadPullsCompleteAction(pulls))
        .catch((error: Response) => Observable.of(new LoadErrorAction(error)));
    })
  ;

  @Effect()
  public loadReadme$: Observable<Action> = this.actions$
    .ofType(ActionTypes.LOAD_README)
    .map((action: LoadReadmeAction) => <RepositoryFragment>action.payload )
    .switchMap((repository: RepositoryFragment) => {
      return this.gitHubAPIService.retrieveRepositoryReadme(repository.nameWithOwner)
        .map((readme: string) => new LoadReadmeCompleteAction(readme))
        .catch((error: Response) => Observable.of(new LoadErrorAction(error)));
    })
  ;

  constructor(
    private actions$: Actions,
    // private store: Store<StoreRootState>,
    private gitHubAPIService: GitHubAPIService
  ) { }
}
