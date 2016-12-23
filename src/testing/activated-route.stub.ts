import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Data } from '@angular/router';
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
  public data: Observable<Data>;

  // create helper BehaviorSubject to easily push test params into Observables
  private paramsSubject: BehaviorSubject<Params>;
  private queryParamsSubject: BehaviorSubject<Params>;
  private dataSubject: BehaviorSubject<Data>;

  // create internal variables to easy get/set existing test params
  private _params = <Params>{};
  private _queryParams = <Params>{};
  private _data = <Data>{};

  constructor() {
    this.paramsSubject = new BehaviorSubject(this._params);
    this.params = this.paramsSubject.asObservable();

    this.queryParamsSubject = new BehaviorSubject(this._queryParams);
    this.queryParams = this.queryParamsSubject.asObservable();

    this.dataSubject = new BehaviorSubject(this._data);
    this.data = this.dataSubject.asObservable();
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

  get testData(): Data {
    return this._data;
  }
  set testData(data: Data) {
    this._data = data;
    this.dataSubject.next(data);
  }

  // ActivatedRoute.snapshot.params
  get snapshot(): ActivatedRouteSnapshot {
    return <ActivatedRouteSnapshot>{
      params: this.testParams,
      queryParams: this.testQueryParams,
      data: this.testData,
    };
  }
}
