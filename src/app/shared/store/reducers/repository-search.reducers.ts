import { Response } from '@angular/http';

import * as repositoryActions from '../actions/repository.actions';
import { AppError } from '../../model/app-error';
import { Repository } from '../../model/repository';

/**
 * Repository search state schema
 */
export interface State {
  entities: Repository[];
  query: string;
  loading: boolean;
  error: AppError;
}

/**
 *
 */
export const initialState: State = {
  entities: [],
  query: null,
  loading: false,
  error: null
};

/**
 * Repository search reducer
 *
 * @param {State} state
 * @param action
 * @returns {any}
 */
export function reducer(state = initialState, action: repositoryActions.Actions): State {
  // console.log('repository-search reducer()', {state, action});

  switch (action.type) {
    case repositoryActions.ActionTypes.SEARCH:
      const query: string = <string>action.payload;
      if (!query) {
        return state;
      }

      return Object.assign({}, initialState, {
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
      const entities = <Repository[]>action.payload;
      return {
        entities: entities,
        query: state.query,
        loading: false,
        error: null,
      };

    case repositoryActions.ActionTypes.REQUEST_ERROR:
      // console.log('error reducer(action=REQUEST_ERROR)', action.payload);
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
export const getLoading = (state: State) => state.loading;

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
