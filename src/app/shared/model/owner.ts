export interface Owner {
  id: number;
  login: string;
  avatar_url: string;
  gravatar_id: string;
  html_url: string;

  organizations_url: string; // API url to user's orgs
  repos_url: string; // API url to user's repos
  starred_url: string; // API url to user's starred repos
  type: string; // e.g. User
  url: string; // HTML url to user's profile
}
