import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/switchMap';

import { Repository } from '../../shared/model/repository';
import { GitHubAPIService } from '../../shared/services/github-api.service';
import {
  ActionTypes, LoadTrendingCompleteAction,
  SearchErrorAction, SearchAction, SearchCompleteAction, SelectAction, LoadTrendingAction
} from './repository.actions';
import { Router } from '@angular/router';


@Injectable()
export class RepositorySearchEffects {

  /**
   * For all LOAD_TRENDING actions fetch trending repositories
   * and dispatch LOAD_TRENDING_COMPLETE with received data.
   */
  @Effect()
  public loadTrending$: Observable<LoadTrendingCompleteAction|SearchErrorAction> = this.actions$
    .ofType(ActionTypes.LOAD_TRENDING)
    .switchMap((action: Action) => {
      return this.gitHubAPIService.retrieveTrendingRepositories()
        .map((repositories: Repository[]) => new LoadTrendingCompleteAction(repositories))
        .catch((error: Response) => Observable.of(new SearchErrorAction(error)))
      ;
    })
  ;

  /**
   * For all SEARCH actions it triggers retrieving
   * GitHub repositories and dispatches SEARCH_COMPLETE action
   * with received data.
   */
  @Effect()
  public search$: Observable<SearchCompleteAction|SearchErrorAction> = this.actions$
    // only take SEARCH actions and debounce them as user types the query
    .ofType(ActionTypes.SEARCH)
    .debounceTime(300)

    // take out search query from SearchAction.payload
    .map((action: SearchAction) => action.payload)

    // Perform actual query using GitHub API service
    // and emit a new SearchCompleteAction with fetched data
    .switchMap((query: string) => {
      if (!query) {
        // Empty query? Return Observable which immediately completes.
        return Observable.empty();
      }

      const nextSearch$ = this.actions$.ofType(ActionTypes.SEARCH).skip(1);
      const nextLoadTrending$ = this.actions$.ofType(ActionTypes.LOAD_TRENDING);

      // Dispatch SearchCompleteAction with found repositories
      // Cancel the requests on next search or when load trending action is dispatched.
      // Note: the next load trending action might be dispatched when user
      // emptied the search query and the trending repositories should be shown.
      // If there's a request in progress with fetching search results, they
      // might arrive *after* the trending and thus displaying the incorrect
      // data in the UI. To make sure it doesn't happen, we cancel the request
      // on next LOAD_TRENDING action.
      return this.gitHubAPIService.retrieveRepositories(query)
        .takeUntil(nextSearch$)
        .takeUntil(nextLoadTrending$)
        .map((repositories: Repository[]) => new SearchCompleteAction(repositories))
        .catch((error: Response) => Observable.of(new SearchErrorAction(error)))
      ;
    })
  ;

  /**
   * Update `?q` param in the url when search query changes
   */
  @Effect({ dispatch: false })
  public searchUpdateUrl$: Observable<string|undefined> = this.actions$
  // Note: we listen to the SEARCH and LOAD_TRENDING actions,
  // so when user deletes the search query (and thus empty query is present)
  // we also remove the query from the url.
    .ofType(ActionTypes.SEARCH, ActionTypes.LOAD_TRENDING)
    .debounceTime(1000)
    .map((action: SearchAction|LoadTrendingAction) => action.payload)
    .do((q: string) => {
      this.router.navigate(['.'], { queryParams: { q } });
    })
  ;

  /**
   * When repository got selected, dispatch router go() action
   */
  @Effect({ dispatch: false })
  public selectRepo$: Observable<Repository> = this.actions$
    .ofType(ActionTypes.SELECT)
    .map((action: SelectAction) => <Repository>action.payload)
    .do((repository: Repository) => {
      this.router.navigateByUrl('/repo/' + repository.full_name);
    })
  ;

  constructor(
    private actions$: Actions,
    private router: Router,
    private gitHubAPIService: GitHubAPIService
  ) { }
}
