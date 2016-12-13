/* tslint:disable:no-unused-variable */
import { reducer, initialState, State } from './repository-search.reducers';
import * as repositoryActions from '../actions/repository.actions';
import { mockRepositorySearchResponse } from '../../services/github-api.service.spec';
import { Repository } from '../../model/repository';

describe('reducers: repository-search', () => {
  it('should produce state for SEARCH action (for empty query)', () => {
    const newState = reducer(initialState, new repositoryActions.SearchAction(''));
    expect(newState === initialState).toBe(true);
  });

  it('should produce state for SEARCH action', () => {
    const newState = reducer(initialState, new repositoryActions.SearchAction('foo'));
    expect(newState).toEqual({ query: 'foo', ids: [], loading: true });
  });

  it('should produce state for SEARCH_COMPLETE action', () => {
    const state = Object.assign(initialState, { query: 'foo' });
    const payload = <Repository[]>mockRepositorySearchResponse.items;

    const newState = reducer(state, new repositoryActions.SearchCompleteAction(payload));
    expect(newState.query).toBe('foo');
    expect(newState.loading).toBe(false);
    expect(newState.ids.length).toBeGreaterThan(0);
    expect(newState.ids[0]).toEqual(mockRepositorySearchResponse.items[0].full_name);
  });
});
