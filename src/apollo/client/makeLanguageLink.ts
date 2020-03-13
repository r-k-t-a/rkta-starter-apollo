import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CLIENT_CONTEXT, ClientContext } from 'apollo/schema';

const DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE || 'en';

const defaultContext = {
  language: DEFAULT_LANGUAGE,
  country: DEFAULT_LANGUAGE.toUpperCase(),
};

export default (cache: InMemoryCache): ApolloLink =>
  setContext((_, { headers }) => {
    const { language, country } =
      cache.readQuery<ClientContext>({ query: CLIENT_CONTEXT })?.clientContext || defaultContext;
    const acceptLanguage = `${language}-${country}`;
    const nextHeaders = { 'Accept-Language': acceptLanguage };
    return { headers: { ...headers, ...nextHeaders } };
  });
