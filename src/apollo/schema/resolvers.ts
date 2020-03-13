import { ApolloContext, ClientContext, Errors, ErrorMessage } from './types';
import { clientContext, localErrors } from './queries';

export const popLocalError = (_: {}, __: {}, { cache }: ApolloContext): {} => {
  const errorsResult = cache.readQuery<Errors>({ query: localErrors });
  const [, ...errors] = errorsResult ? errorsResult.errors : [];
  const data = {
    errors,
  };
  cache.writeData({ data });
  return { errors };
};

export const purgeLocalErrors = (_: {}, __: {}, { cache }: ApolloContext): void => {
  const errors: [] = [];
  cache.writeData({ data: { errors } });
};

export const pushLocalError = (
  _: {} | null,
  { message, name, statusCode = 0 }: ErrorMessage,
  { cache }: ApolloContext,
): {} => {
  const errorsResult = cache.readQuery<Errors>({ query: localErrors });
  const errors = errorsResult ? errorsResult.errors : [];
  const nextError = {
    id: Date.now(),
    message,
    name,
    statusCode,
    __typename: 'ErrorItem',
  };
  const data = {
    errors: [nextError, ...errors],
  };
  cache.writeData({ data });
  return nextError;
};

export const setLanguage = (
  _: {} | null,
  {
    language,
  }: {
    language: string;
  },
  { cache }: ApolloContext,
): {} => {
  const results = cache.readQuery<ClientContext>({ query: clientContext });
  const data = {
    clientContext: { ...results?.clientContext, language },
  };
  cache.writeData({ data });
  return data;
};
