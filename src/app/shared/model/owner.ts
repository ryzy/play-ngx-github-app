/**
 * GitHub repository owner model
 */
export interface Owner {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;

  repos_url: string; // API url to user's repos
  starred_url: string; // API url to user's starred repos
  type: string; // e.g. User|Organisation
  url: string; // HTML url to user's profile
}
