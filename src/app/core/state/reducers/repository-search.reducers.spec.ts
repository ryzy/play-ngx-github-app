/* tslint:disable:no-unused-variable */
import { reducer, initialState } from './repository-search.reducers';
import * as repositoryActions from '../repository.actions';
import { repositoriesTestData } from '../../../../testing/fixtures/repositories';
import { RepositoryFragment } from '../../queries.types';
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
    expect(newState.trending).toEqual(false);
    expect(newState.error).toBe(undefined);
  });

  it('should produce state for LoadTrendingAction', () => {
    const newState = reducer(initialState, new repositoryActions.LoadTrendingAction());
    expect(newState.entities).toEqual([]);
    expect(newState.query).toBe(undefined);
    expect(newState.loading).toEqual(true);
    expect(newState.trending).toEqual(true);
    expect(newState.error).toBe(undefined);
  });

  it('should produce state for SearchCompleteAction and LoadTrendingCompleteAction', () => {
    const state = Object.assign({}, initialState, { query: 'foo' });
    const payload = <RepositoryFragment[]>repositoriesTestData;

    const searchCompleteState = reducer(state, new repositoryActions.SearchCompleteAction(payload));
    expect(searchCompleteState.entities.length).toEqual(repositoriesTestData.length);
    expect(searchCompleteState.query).toEqual('foo');
    expect(searchCompleteState.loading).toEqual(false);
    expect(searchCompleteState.trending).toEqual(false);
    expect(searchCompleteState.error).toBe(undefined);

    const trendingCompleteState = reducer(state, new repositoryActions.LoadTrendingCompleteAction(payload));
    expect(trendingCompleteState.entities.length).toEqual(repositoriesTestData.length);
    expect(trendingCompleteState.loading).toEqual(false);
    expect(trendingCompleteState.trending).toEqual(true);
    expect(trendingCompleteState.error).toBe(undefined);
  });

  it('should produce state for SearchErrorAction', () => {
    const state = Object.assign({}, initialState, { loading: true });
    const error = <Response>{ status: 500, statusText: 'Some server error' };
    const newState = reducer(state, new repositoryActions.SearchErrorAction(error));
    expect(newState.query).toBe(undefined);
    expect(newState.loading).toEqual(false);
    expect(newState.error).not.toBe(undefined);
    expect(newState.error!.message).toEqual(error.statusText!);
    expect(newState.error!.statusCode).toEqual(error.status);
  });
});
