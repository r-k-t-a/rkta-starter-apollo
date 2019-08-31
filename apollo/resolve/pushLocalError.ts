import { InMemoryCache } from 'apollo-cache-inmemory';

import query from '../query/localErrors.graphql';

export interface ErrorMessage {
  message: string;
  name?: string;
  statusCode?: number;
}

export interface Error extends ErrorMessage {
  id: number;
  __typename: string;
}

export interface Errors {
  errors: Error[];
}

export interface ApolloContext {
  cache: InMemoryCache;
}

export default (
  _: {} | null,
  { message, name, statusCode = 0 }: ErrorMessage,
  { cache }: ApolloContext,
): {} => {
  const errorsResult = cache.readQuery<Errors>({ query });
  const errors = errorsResult ? errorsResult.errors : [];
  const data = {
    errors: errors.concat({
      id: Date.now(),
      message,
      name,
      statusCode,
      __typename: 'ErrorItem',
    }),
  };
  cache.writeData({ data });
  return { message, name, statusCode };
};
