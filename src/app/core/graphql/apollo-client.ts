import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, IntrospectionFragmentMatcher, NormalizedCache } from 'apollo-cache-inmemory';
import { GITHUB_API_AUTH_TOKEN } from '../../shared/config';

export function graphQLClientWrapper(): ApolloClient<NormalizedCache> {
  const httpLink = new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: { 'authorization': 'Bearer ' + GITHUB_API_AUTH_TOKEN },
  });

  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
      __schema: {
        types: [
          {
            kind: "INTERFACE",
            name: "RepositoryOwner",
            possibleTypes: [
              { name: "Organization" },
              { name: "User" },
            ],
          },
        ],
      },
    }
  });

  const memoryCache = new InMemoryCache({
    fragmentMatcher
  }).restore((window as any)[ '__APOLLO_STATE__' ])

  return new ApolloClient({
    link: httpLink,
    cache: memoryCache,
    connectToDevTools: true,
    // queryDeduplication: true,
  });
}
