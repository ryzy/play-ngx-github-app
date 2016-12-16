import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * Stub of ActivatedRoute class to use in testing
 * where ActivatedRoute needs to be provided
 *
 * @see https://angular.io/docs/ts/latest/guide/testing.html
 */
@Injectable()
export class ActivatedRouteStub {
  // params, queryParams needs to be Observable
  public params: Observable<Params>;
  public queryParams: Observable<Params>;

  // create helper BehaviorSubject to easily push test params into Observables
  private paramsSubject: BehaviorSubject<Params>;
  private queryParamsSubject: BehaviorSubject<Params>;

  // create internal variables to easy get/set existing test params
  private _params = <Params>{};
  private _queryParams = <Params>{};

  constructor() {
    this.paramsSubject = new BehaviorSubject(this._params);
    this.params = this.paramsSubject.asObservable();

    this.queryParamsSubject = new BehaviorSubject(this._queryParams);
    this.queryParams = this.queryParamsSubject.asObservable();
  }

  get testParams(): Params {
    return this._params;
  }
  set testParams(params: Params) {
    this._params = params;
    this.paramsSubject.next(params);
  }

  get testQueryParams(): Params {
    return this._queryParams;
  }
  set testQueryParams(params: Params) {
    this._queryParams = params;
    this.queryParamsSubject.next(params);
  }

  // ActivatedRoute.snapshot.params
  get snapshot(): ActivatedRouteSnapshot {
    return <ActivatedRouteSnapshot>{
      params: this.testParams,
      queryParams: this.testQueryParams,
    };
  }
}
