import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { Global } from '@emotion/core';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider as UiProvider } from '@rkta/ui';

import withApollo, { InjectedApolloProps } from '../apollo/client/withApollo';
import DefaultLayout from '../src/layouts/DefaultLayout';
import ErrorBoundary from '../src/blocks/Error/Boundary';

// eslint-disable-next-line react/prefer-stateless-function
class NextApp extends App<InjectedApolloProps> {
  render(): JSX.Element {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <UiProvider>
        <ApolloProvider client={apolloClient}>
          <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <Global
            styles={({ color, Text }): {} => ({
              body: {
                ...Text.body,
                ...Text.sans,
                backgroundColor: color.paper,
                margin: 0,
                overscrollBehavior: 'none',
              },
            })}
          />
          <ErrorBoundary>
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </ErrorBoundary>
        </ApolloProvider>
      </UiProvider>
    );
  }
}

export default withApollo(NextApp);
