import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import query from '../query/clientContext.graphql';

const DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE || 'en';

interface ClientContext {
  clientContext: { language: string; country: string };
}

const defaultContext = {
  language: DEFAULT_LANGUAGE,
  country: DEFAULT_LANGUAGE.toUpperCase(),
};

export default (cache: InMemoryCache): ApolloLink =>
  setContext((_, { headers }) => {
    const { language, country } =
      cache.readQuery<ClientContext>({ query })?.clientContext || defaultContext;
    const acceptLanguage = `${language}-${country}`;
    const nextHeaders = { 'Accept-Language': acceptLanguage };
    return { headers: { ...headers, ...nextHeaders } };
  });
