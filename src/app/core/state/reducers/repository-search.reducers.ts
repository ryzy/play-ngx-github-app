import { Response } from '@angular/http';

import * as repositoryActions from '../repository.actions';
import { AppError } from '../../../shared/model/app-error';
import { RepositoryFragment } from '../../queries.types';

/**
 * Repository search state schema
 */
export interface State {
  entities: RepositoryFragment[];
  trending: boolean;
  query?: string;
  loading: boolean;
  error?: AppError;
}

/**
 *
 */
export const initialState: State = {
  entities: [],
  trending: true, // flag indicating that we're showing trending repositories (i.e. not from search query)
  loading: false,
};

/**
 * Repository search reducer
 *
 * @param {State} state
 * @param action
 * @returns {any}
 */
export function reducer(state: State = initialState, action: repositoryActions.Actions): State {
  // console.log('repository-search reducer()', {state, action});

  switch (action.type) {
    case repositoryActions.ActionTypes.SEARCH:
      const query: string = <string>action.payload;
      if (!query) {
        return state;
      }

      return Object.assign({}, initialState, {
        trending: false,
        query: query,
        loading: true,
      });

    case repositoryActions.ActionTypes.LOAD_TRENDING:
      return Object.assign({}, initialState, {
        entities: [],
        loading: true,
      });

    case repositoryActions.ActionTypes.SEARCH_COMPLETE:
    case repositoryActions.ActionTypes.LOAD_TRENDING_COMPLETE:
      const entities = <RepositoryFragment[]>action.payload;
      return {
        entities: entities,
        trending: repositoryActions.ActionTypes.LOAD_TRENDING_COMPLETE === action.type,
        query: state.query,
        loading: false,
      };

    case repositoryActions.ActionTypes.SEARCH_ERROR:
      // console.log('error reducer(action=SEARCH_ERROR)', action.payload);
      const error = <Response>action.payload;
      const errorDecoded = error.json ? error.json() : {}; // in case we have some other, not Response error here
      return Object.assign({}, state, {
        loading: false,
        error: {
          statusCode : error.status,
          message: errorDecoded.message || error.statusText,
        }
      });

    default:
      return state;
  }
}


/**
 * Reducer's selector: get current search query
 * @param state
 */
export const getQuery = (state: State) => state.query;

/**
 * Reducer's selector: get current loading state
 * @param state
 */
export const getLoading = (state: State) => !!state.loading;

/**
 * Reducer's selector: get current trending state
 * @param state
 */
export const getTrending = (state: State) => state.trending;


/**
 * Reducer's selector: get loaded Repository entities
 * @param state
 */
export const getEntities = (state: State) => state.entities;

/**
 * Reducer's selector: get request error
 * @param state
 */
export const getError = (state: State) => state.error;
