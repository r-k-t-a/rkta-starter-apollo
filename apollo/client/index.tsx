/* eslint-disable react/static-property-placement */
import React, { ReactNode } from 'react';
import ApolloClient from 'apollo-client';
import { NextPage } from 'next';
import Head from 'next/head';
import { getDataFromTree } from 'react-apollo';
import get from 'lodash/get';
import isNode from 'detect-node';

import initApollo from './initApollo';

interface Props {
  apolloState: ApolloClient<{}>;
}

export default (App: NextPage): NextPage =>
  class Apollo extends React.Component<Props, {}> {
    static displayName = 'withApollo(App)';

    static async getInitialProps(req): Promise<{}> {
      const { Component, router } = req;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(req);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo({});
      if (isNode) {
        try {
          await getDataFromTree(
            <App {...appProps} Component={Component} router={router} apolloClient={apollo} />,
          );
        } catch (error) {
          // TODO: log me
          req.ctx.res.statusCode = get(error, 'networkError.statusCode', 500);
        }
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return { ...appProps, apolloState };
    }

    apolloClient = initApollo(this.props.apolloState);

    render(): ReactNode {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
