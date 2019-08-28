/* eslint-disable react/static-property-placement */
import React, { ReactNode } from 'react';
import Head from 'next/head';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { getDataFromTree } from 'react-apollo';
import get from 'lodash/get';
import isNode from 'detect-node';
import { AppProps, AppComponentType, DefaultAppIProps, NextAppContext } from 'next/app';

import initApollo from './initApollo';

export interface ApolloProps {
  apolloState?: NormalizedCacheObject;
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export default (App: AppComponentType<ApolloProps & DefaultAppIProps>): AppComponentType =>
  class Apollo extends React.Component<ApolloProps & DefaultAppIProps & AppProps> {
    public apolloClient: ApolloClient<NormalizedCacheObject> = initApollo(this.props.apolloState);

    static displayName = 'withApollo(App)';

    static async getInitialProps(req: NextAppContext): Promise<{}> {
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
            <App
              {...appProps}
              apolloClient={apollo}
              Component={Component}
              pageProps={{}}
              router={router}
            />,
          );
        } catch (error) {
          // TODO: log me
          req.ctx.res.statusCode = get(error, 'networkError.statusCode', 500);
        }
        Head.rewind();
      }

      const apolloState = apollo.cache.extract();

      return { ...appProps, apolloState };
    }

    render(): ReactNode {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
