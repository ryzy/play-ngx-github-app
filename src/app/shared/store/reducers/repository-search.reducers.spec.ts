/* tslint:disable:no-unused-variable */
import { reducer, initialState, State } from './repository-search.reducers';
import * as repositoryActions from '../actions/repository.actions';
import { mockRepositorySearchResponse } from '../../services/github-api.service.spec';
import { Repository } from '../../model/repository';
import { Response } from '@angular/http';

describe('reducers: repository-search', () => {
  it('should produce state for SearchAction (for an empty query)', () => {
    const newState = reducer(initialState, new repositoryActions.SearchAction(''));
    expect(newState === initialState).toBe(true);
  });

  it('should produce state for SearchAction', () => {
    const newState = reducer(initialState, new repositoryActions.SearchAction('foo'));
    expect(newState.entities).toEqual([]);
    expect(newState.query).toEqual('foo');
    expect(newState.loading).toEqual(true);
    expect(newState.error).toBeNull();
  });

  it('should produce state for LoadTrendingAction', () => {
    const newState = reducer(initialState, new repositoryActions.LoadTrendingAction());
    expect(newState.entities).toEqual([]);
    expect(newState.query).toBeNull();
    expect(newState.loading).toEqual(true);
    expect(newState.error).toBeNull();
  });

  it('should produce state for SearchCompleteAction and LoadTrendingCompleteAction', () => {
    const state = Object.assign({}, initialState, { query: 'foo' });
    const payload = <Repository[]>mockRepositorySearchResponse.items;

    const searchCompleteState = reducer(state, new repositoryActions.SearchCompleteAction(payload));
    expect(searchCompleteState.entities.length).toEqual(mockRepositorySearchResponse.items.length);
    expect(searchCompleteState.query).toEqual('foo');
    expect(searchCompleteState.loading).toEqual(false);
    expect(searchCompleteState.error).toBeNull();

    const trendingCompleteState = reducer(state, new repositoryActions.LoadTrendingCompleteAction(payload));
    expect(trendingCompleteState.entities.length).toEqual(mockRepositorySearchResponse.items.length);
    expect(trendingCompleteState.loading).toEqual(false);
    expect(trendingCompleteState.error).toBeNull();
  });

  it('should produce state for RequestErrorAction', () => {
    const state = Object.assign({}, initialState, { loading: true });
    const error = <Response>{ status: 500, statusText: 'Some server error' };
    const newState = reducer(state, new repositoryActions.RequestErrorAction(error));
    expect(newState.query).toBeNull();
    expect(newState.loading).toEqual(false);
    expect(newState.error).not.toBeNull();
    expect(newState.error.message).toEqual(error.statusText);
    expect(newState.error.statusCode).toEqual(error.status);
  });
});
