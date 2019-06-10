import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { setContext } from 'apollo-link-context';
import { withClientState } from 'apollo-link-state';

import clientState from '../schema';
import makeErrorLink from './makeErrorLink';

let apolloClient = null;

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

const create = (initialState = {}) => {
  const cache = new InMemoryCache().restore(initialState);
  const stateLink = withClientState({ ...clientState, cache });
  const links = [stateLink, makeErrorLink(cache), httpLink];
  if (process.browser) links.unshift(authLink);

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: ApolloLink.from(links),
    cache,
  });
};

export default function initApollo(initialState) {
  if (!process.browser) return create(initialState);
  if (!apolloClient) apolloClient = create(initialState);
  return apolloClient;
}
