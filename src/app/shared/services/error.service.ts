import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/merge';

import { StoreRootState } from '../store/index';
import { AppError } from '../model/app-error';
import { getRepositorySearchError, getRepositoryError } from '../store/selectors';

@Injectable()
export class ErrorService {

  constructor(
    private store: Store<StoreRootState>
  ) { }

  public getAppError(): Observable<AppError> {
    return this.store.select(getRepositorySearchError)
      .merge(this.store.select(getRepositoryError));
  }
}
