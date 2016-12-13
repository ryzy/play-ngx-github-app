import { Action } from '@ngrx/store';

import { type } from '../../utils';
import { Repository } from '../../model/repository';

/**
 * Repository action types list
 *
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  SEARCH         : type('@repository/search'),
  SEARCH_COMPLETE: type('@repository/search/complete'),
  LOAD           : type('@repository/load'),
  SELECT         : type('@repository/select'),
};


/**
 * All repository actions.
 *
 * Express each action as class as it enables powerful
 * type checking in reducer functions, using
 * Discriminated Unions pattern.
 */
export class SearchAction implements Action {
  public type: string = ActionTypes.SEARCH;

  /**
   * @param {string} payload: Search query
   */
  constructor(public payload: string) {
  }
}

export class SearchCompleteAction implements Action {
  public type: string = ActionTypes.SEARCH_COMPLETE;

  constructor(public payload: Repository[]) {
  }
}

export class LoadAction implements Action {
  public type: string = ActionTypes.LOAD;

  constructor(public payload: Repository[]) {
  }
}

export class SelectAction implements Action {
  public type: string = ActionTypes.SELECT;

  /**
   * @param {string} payload: Selected repository identifier
   */
  constructor(public payload: string) {
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = SearchAction
  | SearchCompleteAction
  | LoadAction
  | SelectAction
  ;
