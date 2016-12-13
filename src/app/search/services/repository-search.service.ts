import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { StoreRootState } from '../../shared/store';
import {
  getRepositorySearchQuery, getRepositorySearchLoading,
  getRepositorySearchIds
} from '../../shared/store/selectors';
import { SearchAction } from '../../shared/store/actions/repository.actions';


@Injectable()
export class RepositorySearchService {

  constructor(private store: Store<StoreRootState>) { }

  public getSearchQuery(): Observable<string> {
    return this.store.select(getRepositorySearchQuery);
  }

  public getFoundRepositories(): Observable<string[]> {
    return this.store.select(getRepositorySearchIds);
  }

  public isLoading(): Observable<boolean> {
    return this.store.select(getRepositorySearchLoading);
  }

  public doSearch(query: string) {
    this.store.dispatch(new SearchAction(query));
  }
}
