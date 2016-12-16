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
import { replace } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { Repository } from '../../model/repository';
import { GitHubAPIService } from '../../services/github-api.service';
import { StoreRootState } from '../index';
import { ActionTypes, LoadTrendingCompleteAction,
  RequestErrorAction, SearchAction, SearchCompleteAction
} from '../actions/repository.actions';


@Injectable()
export class RepositorySearchEffects {

  /**
   * For all LOAD_TRENDING actions fetch trending repositories
   * and dispatch LOAD_TRENDING_COMPLETE with received data.
   */
  @Effect()
  public loadTrending$: Observable<LoadTrendingCompleteAction> = this.actions$
    .ofType(ActionTypes.LOAD_TRENDING)
    .switchMap((action: Action) => {
      return this.gitHubAPIService.retrieveTrendingRepositories()
        .map((repositories: Repository[]) => new LoadTrendingCompleteAction(repositories))
        .catch((error: Response) => of(new RequestErrorAction(error)))
      ;
    })
  ;

  /**
   * For all SEARCH actions it triggers retrieving
   * GitHub repositories and dispatches SEARCH_COMPLETE action
   * with received data.
   */
  @Effect()
  public search$: Observable<SearchCompleteAction> = this.actions$
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
        return empty();
      }

      // Dispatch route change to update the path with the search query
      this.store.dispatch(replace([], {q: query}));

      // Dispatch SearchCompleteAction with found repositories
      const nextSearch$ = this.actions$.ofType(ActionTypes.SEARCH).skip(1);
      return this.gitHubAPIService.retrieveRepositories(query)
        .takeUntil(nextSearch$)
        .map((repositories: Repository[]) => new SearchCompleteAction(repositories))
        .catch((error: Response) => of(new RequestErrorAction(error)))
      ;
    })
  ;

  constructor(
    private actions$: Actions,
    private store: Store<StoreRootState>,
    private gitHubAPIService: GitHubAPIService
  ) { }
}
