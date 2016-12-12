import { Owner } from './owner';

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  created_at: string;
  pushed_at: string;
  updated_at: string; // any other repo object update (other than push)
  html_url: string;
  homepage: string;
  language: string;
  git_url: string; // clone .git url (HTTPS)
  ssh_url: string; // clone .git url (SSH)
  owner: Owner;

  // stats
  forks: number;
  has_issues: boolean;
  open_issues: number;
  score: number;
  size: number;
  stargazers_count: number;
  watchers: number;

  // API urls
  issues_url: string;
}
