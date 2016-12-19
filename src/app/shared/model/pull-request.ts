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
  assignee: Owner;
  assignees: Owner[];
  milestone: Object;
  created_at: string;
  updated_at: string;
  closed_at: string;
  body: string;
}
