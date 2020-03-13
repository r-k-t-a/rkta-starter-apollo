import { InMemoryCache } from 'apollo-cache-inmemory';
import { ClientStateConfig } from 'apollo-link-state';

import typeDefs from './typeDefs.graphql';
import * as Mutation from './resolvers';
import { ClientContext } from './types';

export * from './queries';
export * from './mutations';
export * from './types';

export const getClientState = (
  cache: InMemoryCache,
  { language, country, statusCode }: ClientContext['clientContext'],
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
    Mutation,
  },
  typeDefs,
});
