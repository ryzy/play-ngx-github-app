/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Response } from '@angular/http';
import { Store } from '@ngrx/store';

import { AppError } from '../model/app-error';
import { ErrorService } from './error.service';
import { CoreModule } from '../../core/core.module';
import { AppRootState } from '../../core/state/index';
import { SearchErrorAction } from '../../core/state/repository.actions';

describe('ErrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule, // just so we have configured Store
      ],
      providers: [
        ErrorService,
      ],
    });
  });

  it('should instantiate', inject([ErrorService], (service: ErrorService) => {
    expect(service).toBeTruthy();
  }));

  it('should get app error', inject([ErrorService, Store], (service: ErrorService, store: Store<AppRootState>) => {
    const error$ = service.getAppError()
      .filter((err) => !!err); // skip the first NULLs

    let errorsFired = 0;
    error$.subscribe((e: AppError) => {
      errorsFired++;
      expect(e.message).toContain('Server Error');
      expect(e.statusCode).toEqual(500);
    });

    store.dispatch(new SearchErrorAction(<Response>{status: 500, statusText: 'Some Server Error'}));
    expect(errorsFired).toEqual(1);
  }));
});
