import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import query from '../query/clientContext.graphql';

const DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE || 'en';

interface ClientContext {
  clientContext: { language: string; locale: string };
}

const defaultContext = {
  language: DEFAULT_LANGUAGE,
  locale: DEFAULT_LANGUAGE.toUpperCase(),
};

export default (cache: InMemoryCache): ApolloLink =>
  setContext((_, { headers }) => {
    const { language, locale } =
      cache.readQuery<ClientContext>({ query })?.clientContext || defaultContext;
    const acceptLanguage = `${language}-${locale}`;
    const nextHeaders = { 'Accept-Language': acceptLanguage };
    return { headers: { ...headers, ...nextHeaders } };
  });
