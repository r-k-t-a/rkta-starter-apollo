import Cookies from 'js-cookie';
import { ApolloContext, ClientContext, Errors, ErrorMessage } from './types';
import { CLIENT_CONTEXT, LOCAL_ERRORS } from './queries';

export const popLocalError = (_: {}, __: {}, { cache }: ApolloContext): {} => {
  const errorsResult = cache.readQuery<Errors>({ query: LOCAL_ERRORS });
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
  const errorsResult = cache.readQuery<Errors>({ query: LOCAL_ERRORS });
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
  const results = cache.readQuery<ClientContext>({ query: CLIENT_CONTEXT });
  const data = {
    clientContext: { ...results?.clientContext, language },
  };
  Cookies.set('language', language, { expires: 365 });
  cache.writeData({ data });
  return data;
};
