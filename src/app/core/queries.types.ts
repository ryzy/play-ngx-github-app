/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type RepositoryDetailsQueryVariables = {
  owner: string,
  name: string,
};

export type RepositoryDetailsQuery = {
  // Lookup a given repository by the owner and repository name.
  repository?:  RepositoryFragment
};

export type SearchRepositoriesQueryVariables = {
  searchQuery: string,
};

export type SearchRepositoriesQuery = {
  // Perform a search across resources.
  search:  {
    // The number of repositories that matched the search query.
    repositoryCount: number,
    // A list of nodes.
    nodes?: RepositoryFragment[],
  },
};

export type RepositoryOwnerFragment = ( {
      __typename: "Organization",
      id: string,
      // The username used to login.
      login: string,
      // A URL pointing to the owner's public avatar.
      avatarUrl: string,
      // The HTTP URL for the owner.
      url: string,
    } | {
      __typename: "User",
      id: string,
      // The username used to login.
      login: string,
      // A URL pointing to the owner's public avatar.
      avatarUrl: string,
      // The HTTP URL for the owner.
      url: string,
    }
  );

export type RepositoryFragment = {
  id: string,
  // The name of the repository.
  name: string,
  // The repository's name with owner.
  nameWithOwner: string,
  // The description of the repository.
  description: string | null,
  // The description of the repository rendered to HTML.
  descriptionHTML: string,
  // Identifies the date and time when the object was created.
  createdAt: string,
  // Identifies when the repository was last pushed to.
  pushedAt: string | null,
  // A list containing a breakdown of the language composition of the repository.
  languages:  {
    // A list of nodes.
    nodes:  Array< {
      // The name of the current language.
      name: string,
      // The color defined for the current language.
      color: string | null,
    } | null > | null,
  } | null,
  // The HTTP URL for this repository
  url: string,
  // The repository's URL.
  homepageUrl: string | null,
  // Identifies if the repository is a fork.
  isFork: boolean,
  // A list of forked repositories.
  forks:  {
    // Identifies the total count of items in the connection.
    totalCount: number,
  },
  // A list of issues that have been opened in the repository.
  issues:  {
    // Identifies the total count of items in the connection.
    totalCount: number,
  },
  // A list of users who have starred this starrable.
  stargazers:  {
    // Identifies the total count of items in the connection.
    totalCount: number,
  },
  // A list of users watching the repository.
  watchers:  {
    // Identifies the total count of items in the connection.
    totalCount: number,
  },
  // The User owner of the repository.
  owner: RepositoryOwnerFragment,
};
