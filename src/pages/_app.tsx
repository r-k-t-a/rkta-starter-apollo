import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { css, Global } from '@emotion/core';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider as UiProvider } from '@rkta/ui';

import ErrorBoundary from 'blocks/Error/Boundary';
import withApollo, { InjectedApolloProps } from 'apollo/client/withApollo';

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
            styles={({ color, Text }): {} => css`
              body {
                ${Text.body}
                ${Text.sans}
                background-color: ${color.paper};
                margin: 0;
                overscroll-behavior: none;
              }
            `}
          />
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </ApolloProvider>
      </UiProvider>
    );
  }
}

export default withApollo(NextApp);
