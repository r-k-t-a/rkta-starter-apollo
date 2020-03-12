import ApolloClient from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { setContext } from 'apollo-link-context';
import { withClientState } from 'apollo-link-state';
import isNode from 'detect-node';

import makeErrorLink from './makeErrorLink';
import makeLanguageLink from './makeLanguageLink';
import { ClientContext, getClientState } from '../schema';

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

const create = (cacheObject: NormalizedCacheObject, clientContext: ClientContext): ClientType => {
  const cache = new InMemoryCache().restore(cacheObject);
  const clientState = getClientState(cache, clientContext);
  const links = [
    withClientState(clientState),
    makeErrorLink(cache),
    makeLanguageLink(cache),
    httpLink,
  ];
  if (!isNode) links.unshift(authLink);

  return new ApolloClient({
    connectToDevTools: !isNode,
    ssrMode: isNode,
    link: ApolloLink.from(links),
    cache,
  });
};

export default function initApollo(
  cacheObject: NormalizedCacheObject,
  clientContext: ClientContext,
): ClientType {
  if (isNode) return create(cacheObject, clientContext);
  if (!apolloClient) apolloClient = create(cacheObject, clientContext);
  return apolloClient;
}
