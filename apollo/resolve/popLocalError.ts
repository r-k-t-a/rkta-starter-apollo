import query from '../query/localErrors.graphql';
import { ApolloContext, Errors } from './pushLocalError';

export default (_: {}, __: {}, { cache }: ApolloContext): {} => {
  const errorsResult = cache.readQuery<Errors>({ query });
  const [, ...errors] = errorsResult ? errorsResult.errors : [];
  console.log('pop', errorsResult);
  const data = {
    errors,
  };
  cache.writeData({ data });
  return { errors };
};
