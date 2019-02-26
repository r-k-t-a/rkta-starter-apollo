import { onError } from 'apollo-link-error';
import pushLocalError from '../resolve/pushLocalError';

const makeHandler = cache => ({ message, name = 'Query Error' }) => {
  pushLocalError(null, { message, name }, { cache });
};

export default cache =>
  onError(({ graphQLErrors, networkError }) => {
    const handleError = makeHandler(cache);
    if (graphQLErrors) graphQLErrors.map(handleError);
    if (networkError) {
      const { name, statusCode, message } = networkError;
      handleError({ message, name, statusCode });
    }
  });
