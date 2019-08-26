import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import pushLocalError from '../resolve/pushLocalError';

const makeHandler = cache => ({ message, name = 'Query Error' }): void => {
  pushLocalError(null, { message, name }, { cache });
};

export default (cache): ApolloLink =>
  onError(({ graphQLErrors, networkError }) => {
    const handleError = makeHandler(cache);
    if (graphQLErrors) graphQLErrors.map(handleError);
    if (networkError) {
      const { name, message } = networkError;
      handleError({ message, name });
    }
  });
