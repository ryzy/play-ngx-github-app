import { Owner } from './owner';

/**
 * GitHub repository PR model
 */
export interface PullRequest {
  id: number;
  html_url: string;
  number: number;
  title: string;

  user: Owner;
  state: string;
  locked: boolean;
  assignee?: Owner|null;
  assignees?: Owner[]|null;
  milestone?: Object|null;
  created_at: string;
  updated_at: string;
  closed_at?: string|null;
  body: string;

  // Remaining properties
  [key: string]: any;
}
