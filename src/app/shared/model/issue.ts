import { Owner } from './owner';

/**
 * GitHub repository issue model
 */
export interface Issue {
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
  labels: IssueLabel[];
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string;
  body: string;
}

export interface IssueLabel {
  id: number;
  url: string;
  name: string;
  color: string, // hex color, but without `#`
}
