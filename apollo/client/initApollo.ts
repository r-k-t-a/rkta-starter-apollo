import ApolloClient from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { setContext } from 'apollo-link-context';
import { withClientState } from 'apollo-link-state';
import isNode from 'detect-node';

import clientState from '../schema';
import makeErrorLink from './makeErrorLink';

type ClientType = ApolloClient<NormalizedCacheObject>;

let apolloClient: ClientType;

const httpLink = new HttpLink({
  credentials: 'same-origin',
  uri: process.env.GRAPHQL_ENDPOINT_URL,
  useGETForQueries: false,
  fetch,
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  },
}));

const create = (initialState = {}): ClientType => {
  const cache: InMemoryCache = new InMemoryCache().restore(initialState);
  const stateLink = withClientState({ ...clientState, cache });
  const links = [stateLink, makeErrorLink(cache), httpLink];
  if (!isNode) links.unshift(authLink);

  return new ApolloClient({
    connectToDevTools: !isNode,
    ssrMode: isNode,
    link: ApolloLink.from(links),
    cache,
  });
};

export default function initApollo(initialState: NormalizedCacheObject): ClientType {
  if (isNode) return create(initialState);
  if (!apolloClient) apolloClient = create(initialState);
  return apolloClient;
}
