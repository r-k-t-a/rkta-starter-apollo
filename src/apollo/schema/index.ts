import { InMemoryCache } from 'apollo-cache-inmemory';
import { ClientStateConfig } from 'apollo-link-state';

import typeDefs from './typeDefs.graphql';
import purgeLocalErrors from '../resolve/purgeLocalErrors';
import pushLocalError from '../resolve/pushLocalError';
import popLocalError from '../resolve/popLocalError';

export interface ClientContext {
  language?: string;
  country?: string;
  statusCode: number;
}

export const getClientState = (
  cache: InMemoryCache,
  { language, country, statusCode }: ClientContext,
): ClientStateConfig => ({
  cache,
  defaults: {
    clientContext: {
      __typename: 'ClientContext',
      language,
      country,
      statusCode,
    },
    errors: [],
  },
  resolvers: {
    Mutation: {
      purgeLocalErrors,
      pushLocalError,
      popLocalError,
    },
  },
  typeDefs,
});
