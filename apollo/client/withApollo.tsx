/* eslint-disable react/static-property-placement */
import React from 'react';
import Head from 'next/head';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { getDataFromTree } from 'react-apollo';
import get from 'lodash/get';
import isNode from 'detect-node';

import App, { AppContext, AppInitialProps } from 'next/app';

import initApollo from './initApollo';

export interface InjectedApolloProps {
  apolloState?: NormalizedCacheObject;
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const withApollo = <P extends AppInitialProps>(WrappedApp: React.ComponentType<P>) =>
  class WithApollo extends App<P & InjectedApolloProps> {
    public apolloClient: ApolloClient<NormalizedCacheObject> = initApollo(
      this.props.apolloState || {},
    );

    static displayName = 'withApollo(App)';

    static async getInitialProps(req: AppContext): Promise<AppInitialProps> {
      const { Component, router, ctx } = req;

      let appProps = {};
      if (WrappedApp.getInitialProps) {
        appProps = await WrappedApp.getInitialProps(req);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo({});
      if (isNode) {
        try {
          await getDataFromTree(
            <WrappedApp
              {...appProps}
              apolloClient={apollo}
              Component={Component}
              pageProps={{}}
              router={router}
            />,
          );
        } catch (error) {
          // TODO: log me
          if (ctx.res) ctx.res.statusCode = get(error, 'networkError.statusCode', 500);
        }
        Head.rewind();
      }

      const apolloState = apollo.cache.extract();

      return { ...appProps, apolloState };
    }

    render(): JSX.Element {
      return <WrappedApp {...this.props} apolloClient={this.apolloClient} />;
    }
  };

export default withApollo;
