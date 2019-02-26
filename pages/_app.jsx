import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from 'react-apollo';

import withApolloClient from '../apollo/client';
import DefaultLayout from '../src/layouts/DefaultLayout';

class NextApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(NextApp);
