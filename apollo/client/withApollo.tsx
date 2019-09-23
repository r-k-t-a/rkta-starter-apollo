import React from 'react';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { getDataFromTree } from 'react-apollo';
import get from 'lodash/get';
import isNode from 'detect-node';

import App, { AppContext, AppInitialProps } from 'next/app';
import Head from 'next/head';

import initApollo from './initApollo';

interface ApolloInitialProps extends AppInitialProps {
  apolloState: NormalizedCacheObject;
}

export interface InjectedApolloProps extends AppContext, AppInitialProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  apolloState?: NormalizedCacheObject;
}

const withApollo = <P extends InjectedApolloProps>(
  WrappedApp: React.ComponentType<InjectedApolloProps> & { getInitialProps?: Function },
): React.ComponentType<P & ApolloInitialProps> =>
  class WithApolloClass extends App<P & ApolloInitialProps> {
    static get displayName(): string {
      return 'withApollo(App)';
    }

    public apolloClient: ApolloClient<NormalizedCacheObject> = initApollo(
      this.props.apolloState || {},
    );

    static async getInitialProps(req: AppContext): Promise<ApolloInitialProps> {
      const { Component, router, ctx } = req;
      const { statusCode = 500 } = { ...ctx.err, ...ctx.res };

      let appProps = {};
      const { getInitialProps } = WrappedApp;
      if (getInitialProps) appProps = await getInitialProps(req);

      const apollo = initApollo({ statusCode });
      if (isNode) {
        try {
          await getDataFromTree(
            <WrappedApp
              pageProps={{}}
              {...req}
              {...appProps}
              apolloClient={apollo}
              Component={Component}
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
      return { ...appProps, apolloState, pageProps: {} };
    }

    render(): JSX.Element {
      return <WrappedApp {...this.props} apolloClient={this.apolloClient} />;
    }
  };

export default withApollo;
