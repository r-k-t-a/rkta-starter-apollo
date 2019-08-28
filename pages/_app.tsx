import React from 'react';
import { AppProps, Container, DefaultAppIProps } from 'next/app';
import Head from 'next/head';
import { Global } from '@emotion/core';
import { ApolloProvider } from 'react-apollo';
import { Provider as UiProvider } from '@rkta/ui';

import withApolloClient, { ApolloProps } from '../apollo/client';
import DefaultLayout from '../src/layouts/DefaultLayout';

// eslint-disable-next-line react/prefer-stateless-function
class NextApp extends React.Component<ApolloProps & DefaultAppIProps & AppProps> {
  render(): React.ReactNode {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
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
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </ApolloProvider>
        </UiProvider>
      </Container>
    );
  }
}

export default withApolloClient(NextApp);
