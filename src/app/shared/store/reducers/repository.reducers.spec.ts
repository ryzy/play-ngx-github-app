/* tslint:disable:no-unused-variable */
import { reducer, initialState, State } from './repository.reducers';
import * as repositoryActions from '../actions/repository.actions';
import { Repository } from '../../model/repository';

describe('reducers: repository', () => {
  it('should produce state for LOAD and SEARCH_COMPLETE actions', () => {
    const newState = reducer(initialState, new repositoryActions.LoadAction([]));
    expect(newState).toEqual(initialState);

    // LOAD: one repo
    const newState1 = reducer(initialState, new repositoryActions.LoadAction([
      <Repository>{ full_name: 'foo/bar' }
    ]));
    expect(Object.keys(newState1.entities).length).toEqual(1);

    // LOAD: another one repo, expect now two of them in the store
    const newState2 = reducer(newState1, new repositoryActions.LoadAction([
      <Repository>{ full_name: 'another/repo' }
    ]));
    expect(Object.keys(newState2.entities).length).toEqual(2);

    // SEARCH_COMPLETE with yet another repo
    const newStateSearchComplete = reducer(newState2, new repositoryActions.SearchCompleteAction([
      <Repository>{ full_name: 'yet-another/repo' }
    ]));
    expect(Object.keys(newStateSearchComplete.entities).length).toEqual(3);
  });
});
