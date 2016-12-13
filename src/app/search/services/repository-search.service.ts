import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { StoreRootState } from '../../shared/store';
import {
  getRepositorySearchQuery, getRepositoryLoading,
  getRepositorySearchNames
} from '../../shared/store/selectors';
import { SearchAction } from '../../shared/store/actions/repository.actions';


@Injectable()
export class RepositorySearchService {

  constructor(private store: Store<StoreRootState>) { }

  public getSearchQuery(): Observable<string> {
    return this.store.select(getRepositorySearchQuery);
  }

  public getFoundRepositories(): Observable<string[]> {
    return this.store.select(getRepositorySearchNames);
  }

  public isLoading(): Observable<boolean> {
    return this.store.select(getRepositoryLoading);
  }

  public doSearch(query: string) {
    this.store.dispatch(new SearchAction(query));
  }
}