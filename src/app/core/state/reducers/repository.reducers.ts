import { Response } from '@angular/http';

import * as repositoryActions from '../repository.actions';
import { RepositoryFragment } from '../../queries.types';
import { AppError } from '../../../shared/model/app-error';
import { Commit } from '../../../shared/model/commit';
import { Issue } from '../../../shared/model/issue';
import { PullRequest } from '../../../shared/model/pull-request';

/**
 * Repository state schema
 */
export interface State {
  entity?: RepositoryFragment; // currently loaded/displayed repository
  error?: AppError; // any error while loading entity and/or commits/issues/pulls etc
  loading: boolean;
  commits: Commit[];
  issues: Issue[];
  pulls: PullRequest[];
  readme?: string;
}

export const initialState: State = {
  loading: false,
  commits: [],
  issues: [],
  pulls: [],
};

/**
 * Repository reducer
 */
export function reducer(state: State = initialState, action: repositoryActions.Actions): State {
  // console.log('repository reducer()', {state, action});

  switch (action.type) {
    /**
     * Called when repository got selected from search results
     * or when repository data got loaded from API.
     */
    case repositoryActions.ActionTypes.SELECT:
    case repositoryActions.ActionTypes.LOAD:
      return {
        ...initialState,
        entity: <RepositoryFragment>action.payload,
        error: undefined,
      };

    case repositoryActions.ActionTypes.LOAD_COMMITS:
    case repositoryActions.ActionTypes.LOAD_ISSUES:
    case repositoryActions.ActionTypes.LOAD_PULLS:
    case repositoryActions.ActionTypes.LOAD_README:
      return { ...state, loading: true };

    case repositoryActions.ActionTypes.LOAD_COMMITS_COMPLETE:
      return {
        ...state,
        commits: <Commit[]>action.payload,
        error: undefined,
        loading: false,
      };

    case repositoryActions.ActionTypes.LOAD_ISSUES_COMPLETE:
      return {
        ...state,
        issues: <Issue[]>action.payload,
        error: undefined,
        loading: false,
      };

    case repositoryActions.ActionTypes.LOAD_PULLS_COMPLETE:
      return {
        ...state,
        pulls: <PullRequest[]>action.payload,
        error: undefined,
      };

    case repositoryActions.ActionTypes.LOAD_README_COMPLETE:
      return {
        ...state,
        readme: action.payload,
        error: undefined,
      };

    case repositoryActions.ActionTypes.LOAD_ERROR:
      // console.log('error reducer(action=LOAD_ERROR)', action.payload);
      const error = <Response>action.payload;
      const errorDecoded = error.json ? error.json() : {}; // in case we have some other, not Response error here
      return {
        ...state,
        loading: false,
        error: {
          statusCode : error.status,
          message: errorDecoded.message || error.statusText,
        }
      };

    default:
      return state;
  }
}


/**
 * Reducer's selector: get entities in store
 * @param state
 */
export const getEntity = (state: State) => state.entity;
export const getError = (state: State) => state.error;
export const getLoading = (state: State) => state.loading;
export const getCommits = (state: State) => state.commits;
export const getIssues = (state: State) => state.issues;
export const getPulls = (state: State) => state.pulls;
export const getReadme = (state: State) => state.readme;
