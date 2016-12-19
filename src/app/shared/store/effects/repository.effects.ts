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
import { Action, Store } from '@ngrx/store';
import { replace, go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { Repository } from '../../model/repository';
import { GitHubAPIService } from '../../services/github-api.service';
import { StoreRootState } from '../index';
import {
  ActionTypes, LoadTrendingCompleteAction,
  SearchErrorAction, SearchAction, SearchCompleteAction, SelectAction, LoadReadmeAction, LoadReadmeCompleteAction,
  LoadErrorAction, LoadCommitsAction, LoadCommitsCompleteAction, LoadIssuesAction, LoadIssuesCompleteAction,
  LoadPullsAction, LoadPullsCompleteAction
} from '../actions/repository.actions';
import { Commit } from '../../model/commit';
import { Issue } from '../../model/issue';
import { PullRequest } from '../../model/pull-request';


@Injectable()
export class RepositoryEffects {

  @Effect()
  public loadCommits$: Observable<Action> = this.actions$
    .ofType(ActionTypes.LOAD_COMMITS)
    .map((action: LoadCommitsAction) => <Repository>action.payload )
    .switchMap((repository: Repository) => {
      return this.gitHubAPIService.retrieveRepositoryCommits(repository.full_name)
        .map((commits: Commit[]) => new LoadCommitsCompleteAction(commits))
        .catch((error: Response) => of(new LoadErrorAction(error)));
    })
  ;

  @Effect()
  public loadIssues$: Observable<Action> = this.actions$
    .ofType(ActionTypes.LOAD_ISSUES)
    .map((action: LoadIssuesAction) => <Repository>action.payload )
    .switchMap((repository: Repository) => {
      return this.gitHubAPIService.retrieveRepositoryIssues(repository.full_name)
        .map((issues: Issue[]) => new LoadIssuesCompleteAction(issues))
        .catch((error: Response) => of(new LoadErrorAction(error)));
    })
  ;

  @Effect()
  public loadPulls$: Observable<Action> = this.actions$
    .ofType(ActionTypes.LOAD_PULLS)
    .map((action: LoadPullsAction) => <Repository>action.payload )
    .switchMap((repository: Repository) => {
      return this.gitHubAPIService.retrieveRepositoryPulls(repository.full_name)
        .map((pulls: PullRequest[]) => new LoadPullsCompleteAction(pulls))
        .catch((error: Response) => of(new LoadErrorAction(error)));
    })
  ;

  @Effect()
  public loadReadme$: Observable<Action> = this.actions$
    .ofType(ActionTypes.LOAD_README)
    .map((action: LoadReadmeAction) => <Repository>action.payload )
    .switchMap((repository: Repository) => {
      return this.gitHubAPIService.retrieveRepositoryReadme(repository.full_name)
        .map((readme: string) => new LoadReadmeCompleteAction(readme))
        .catch((error: Response) => of(new LoadErrorAction(error)));
    })
  ;

  constructor(
    private actions$: Actions,
    // private store: Store<StoreRootState>,
    private gitHubAPIService: GitHubAPIService
  ) { }
}
