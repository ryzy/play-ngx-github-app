import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/merge';

import { AppRootState } from '../../core/state/index';
import { AppError } from '../model/app-error';
import { getRepositorySearchError, getRepositoryError } from '../../core/state/selectors';

@Injectable()
export class ErrorService {

  constructor(
    private store: Store<AppRootState>
  ) { }

  public getAppError(): Observable<AppError|undefined> {
    return this.store.select(getRepositorySearchError)
      .merge(this.store.select(getRepositoryError));
  }
}
