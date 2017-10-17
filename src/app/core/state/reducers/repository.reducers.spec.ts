/* tslint:disable:no-unused-variable */
import { reducer, initialState, State } from './repository.reducers';
import * as repositoryActions from '../repository.actions';
import { Repository } from '../../../shared/model/repository';

import { repositoryTestData } from '../../../../testing/fixtures/repository';
import { repositoryCommitsTestData } from '../../../../testing/fixtures/repository-commits';
import { repositoryIssuesTestData } from '../../../../testing/fixtures/repository-issues';
import { repositoryPullsTestData } from '../../../../testing/fixtures/repository-pulls';
import { Response } from '@angular/http';

describe('reducers: repository', () => {
  const repository = <Repository>repositoryTestData;
  const commits = [ repositoryCommitsTestData[0], repositoryCommitsTestData[1], repositoryCommitsTestData[2] ];
  const issues = [ repositoryIssuesTestData[0], repositoryIssuesTestData[1], repositoryIssuesTestData[2] ];
  const pulls = [ repositoryPullsTestData[0], repositoryPullsTestData[1], repositoryPullsTestData[2] ];

  it('should produce state for LOAD, SELECT action', () => {
    const newState = reducer(initialState, new repositoryActions.LoadAction(repositoryTestData));
    expect(newState.entity).toBe(repository);
    expect(newState.error).toBe(undefined);

    const selectState = reducer(initialState, new repositoryActions.SelectAction(repositoryTestData));
    expect(selectState.entity).toBe(repository);
    expect(selectState.error).toBe(undefined);
  });

  it('should produce state for LOAD_* actions', () => {
    const newState = reducer(initialState, new repositoryActions.LoadPullsAction(repository));
    expect(newState.loading).toBe(true);
  });

  it('should produce state for LOAD_COMMITS_COMPLETE actions', () => {
    const newState = reducer(initialState, new repositoryActions.LoadCommitsCompleteAction(commits));
    expect(newState.commits).toBeTruthy();
    expect(newState.commits.length).toBe(commits.length);
    expect(newState.loading).toBe(false);
  });

  it('should produce state for LOAD_ISSUES_COMPLETE actions', () => {
    const newState = reducer(initialState, new repositoryActions.LoadIssuesCompleteAction(issues));
    expect(newState.issues).toBeTruthy();
    expect(newState.issues.length).toBe(issues.length);
    expect(newState.loading).toBe(false);
  });

  it('should produce state for LOAD_PULLS_COMPLETE actions', () => {
    const newState = reducer(initialState, new repositoryActions.LoadPullsCompleteAction(pulls));
    expect(newState.pulls).toBeTruthy();
    expect(newState.pulls.length).toBe(pulls.length);
    expect(newState.loading).toBe(false);
  });

  it('should produce state for LOAD_README_COMPLETE actions', () => {
    const newState = reducer(initialState, new repositoryActions.LoadReadmeCompleteAction('readme content'));
    expect(newState.readme).toEqual('readme content');
    expect(newState.loading).toBe(false);
  });

  it('should produce state for LOAD_ERROR actions', () => {
    const error = <Response>{ status: 500, statusText: 'Some server error' };
    const newState = reducer(initialState, new repositoryActions.LoadErrorAction(error));
    expect(newState.error!.statusCode).toEqual(500);
    expect(newState.error!.message).toEqual('Some server error');
    expect(newState.loading).toBe(false);
  });
});
