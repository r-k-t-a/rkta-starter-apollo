import query from '../query/localErrors.graphql';
import { ApolloContext, Error, Errors } from './pushLocalError';

export default (_: {}, { id }: Error, { cache }: ApolloContext): {} => {
  const errorsResult = cache.readQuery<Errors>({ query });
  const errors = errorsResult ? errorsResult.errors : [];
  const data = {
    errors: errors.filter(error => error.id !== id),
  };
  cache.writeData({ data });
  return { id };
};
