import { InMemoryCache } from 'apollo-cache-inmemory';

export interface ApolloContext {
  cache: InMemoryCache;
}

export interface ClientContext {
  clientContext: { language: string; country: string; statusCode: number };
}

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
