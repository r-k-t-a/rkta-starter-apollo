import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { css, Global } from '@emotion/core';
import { ApolloProvider } from 'react-apollo';
import { Provider as UiProvider } from '@rkta/ui';

import withApolloClient from '../apollo/client';
import DefaultLayout from '../src/layouts/DefaultLayout';

class NextApp extends App<{}> {
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
              styles={({ color, Text }) => [
                css`
                  body {
                    background-color: ${color.paper};
                    margin: 0;
                    overscroll-behavior: none;
                  }
                `,
                {
                  body: {
                    ...Text.body,
                    ...Text.sans,
                  },
                },
              ]}
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
