import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ErrorMessage } from '../schema';
import { pushLocalError } from '../schema/resolvers';

const makeHandler = (cache: InMemoryCache) => ({
  message,
  name = 'Query Error',
}: ErrorMessage): void => {
  pushLocalError(null, { message, name }, { cache });
};

export default (cache: InMemoryCache): ApolloLink =>
  onError(({ graphQLErrors, networkError }) => {
    const handleError = makeHandler(cache);
    if (graphQLErrors) graphQLErrors.map(handleError);
    if (networkError) {
      const { name, message } = networkError;
      handleError({ message, name });
    }
  });
