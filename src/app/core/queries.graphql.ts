import gql from 'graphql-tag';

export const repositoryOwnerFragment = gql`
  fragment RepositoryOwner on RepositoryOwner {
    __typename # Organization|User
    id
    login
    avatarUrl
    url
  }
`;

export const repositoryFragment = gql`
  fragment Repository on Repository {
    id
    name
    nameWithOwner
    description
    descriptionHTML
    createdAt
    pushedAt
    languages(first: 1) {
      nodes {
        name
        color
      }
    }
    url
    homepageUrl
    isFork
    forks { totalCount }
    issues { totalCount }
    stargazers { totalCount }
    watchers  { totalCount }
    owner {
      ...RepositoryOwner
    }
  }

  ${repositoryOwnerFragment}
`;


//
// Queries
//
export const repositoryDetailsQuery = gql`
  query RepositoryDetails($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      ...Repository
    }
  }

  ${repositoryFragment}
`;

export const searchRepositoriesQuery = gql`
  ${repositoryFragment}
  
  query SearchRepositories($searchQuery: String!) {
    search(query: $searchQuery, first: 10, type: REPOSITORY) {
      repositoryCount
      nodes {
        ...Repository
      }
    }
  }
`;
