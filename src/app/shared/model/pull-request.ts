import { RepositoryOwnerFragment } from '../../core/queries.types';

/**
 * GitHub repository PR model
 */
export interface PullRequest {
  id: number;
  html_url: string;
  number: number;
  title: string;

  user: RepositoryOwnerFragment;
  state: string;
  locked: boolean;
  assignee?: RepositoryOwnerFragment|null;
  assignees?: RepositoryOwnerFragment[]|null;
  milestone?: Object|null;
  created_at: string;
  updated_at: string;
  closed_at?: string|null;
  body: string;

  // Remaining properties
  [key: string]: any;
}
