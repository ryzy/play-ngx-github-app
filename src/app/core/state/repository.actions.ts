import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { type } from '../../shared/utils';
import { Repository } from '../../shared/model/repository';
import { Commit } from '../../shared/model/commit';
import { Issue } from '../../shared/model/issue';
import { PullRequest } from '../../shared/model/pull-request';

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
  SEARCH                  : type('@repository/search'),
  SEARCH_COMPLETE         : type('@repository/search/complete'),
  SEARCH_ERROR            : type('@repository/search/error'),
  LOAD_TRENDING           : type('@repository/load-trending'),
  LOAD_TRENDING_COMPLETE  : type('@repository/load-trending/complete'),
  SELECT                  : type('@repository/select'),
  LOAD                    : type('@repository/load'),
  LOAD_ERROR              : type('@repository/load/error'),
  LOAD_COMMITS            : type('@repository/load-commits'),
  LOAD_COMMITS_COMPLETE   : type('@repository/load-commits/complete'),
  LOAD_ISSUES             : type('@repository/load-issues'),
  LOAD_ISSUES_COMPLETE    : type('@repository/load-issues/complete'),
  LOAD_PULLS              : type('@repository/load-pulls'),
  LOAD_PULLS_COMPLETE     : type('@repository/load-pulls/complete'),
  LOAD_README             : type('@repository/load-readme'),
  LOAD_README_COMPLETE    : type('@repository/load-readme/complete'),
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
  constructor(public payload: string) {}
}

export class SearchErrorAction implements Action {
  public type: string = ActionTypes.SEARCH_ERROR;

  constructor(public payload: Response) {}
}

export class SearchCompleteAction implements Action {
  public type: string = ActionTypes.SEARCH_COMPLETE;

  constructor(public payload: Repository[]) {}
}

export class LoadTrendingAction implements Action {
  public type: string = ActionTypes.LOAD_TRENDING;

  constructor(public payload?: any) {} // payload not used / not relevant
}

export class LoadTrendingCompleteAction implements Action {
  public type: string = ActionTypes.LOAD_TRENDING_COMPLETE;

  constructor(public payload: Repository[]) {}
}

export class SelectAction implements Action {
  public type: string = ActionTypes.SELECT;

  constructor(public payload: Repository) {}
}

export class LoadAction implements Action {
  public type: string = ActionTypes.LOAD;

  constructor(public payload: Repository) {}
}

export class LoadErrorAction implements Action {
  public type: string = ActionTypes.LOAD_ERROR;

  constructor(public payload: Response) {}
}

export class LoadCommitsAction implements Action {
  public type: string = ActionTypes.LOAD_COMMITS;

  constructor(public payload: Repository) {}
}

export class LoadCommitsCompleteAction implements Action {
  public type: string = ActionTypes.LOAD_COMMITS_COMPLETE;

  constructor(public payload: Commit[]) {}
}

export class LoadIssuesAction implements Action {
  public type: string = ActionTypes.LOAD_ISSUES;

  constructor(public payload: Repository) {}
}

export class LoadIssuesCompleteAction implements Action {
  public type: string = ActionTypes.LOAD_ISSUES_COMPLETE;

  constructor(public payload: Issue[]) {}
}

export class LoadPullsAction implements Action {
  public type: string = ActionTypes.LOAD_PULLS;

  constructor(public payload: Repository) {}
}

export class LoadPullsCompleteAction implements Action {
  public type: string = ActionTypes.LOAD_PULLS_COMPLETE;

  constructor(public payload: PullRequest[]) {}
}

export class LoadReadmeAction implements Action {
  public type: string = ActionTypes.LOAD_README;

  constructor(public payload: Repository) {}
}

export class LoadReadmeCompleteAction implements Action {
  public type: string = ActionTypes.LOAD_README_COMPLETE;

  /**
   * @param payload: Readme content. Rendered as HTML
   */
  constructor(public payload: string) {}
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = SearchAction
  | SearchErrorAction
  | SearchCompleteAction
  | LoadTrendingAction
  | LoadTrendingCompleteAction
  | SelectAction
  | LoadAction
  | LoadErrorAction
  | LoadCommitsAction
  | LoadCommitsCompleteAction
  | LoadIssuesAction
  | LoadIssuesCompleteAction
  | LoadPullsAction
  | LoadPullsCompleteAction
  | LoadReadmeAction
  | LoadReadmeCompleteAction
  ;
