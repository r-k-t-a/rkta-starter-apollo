/* eslint-disable react/static-property-placement */
import React from 'react';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import get from 'lodash/get';
import isNode from 'detect-node';

import App, { AppContext, AppInitialProps } from 'next/app';
import Head from 'next/head';

import initApollo from './initApollo';
import { ClientContext } from '../schema';

interface ApolloInitialProps extends AppInitialProps {
  apolloState: NormalizedCacheObject;
  clientContext: ClientContext['clientContext'];
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
      this.props.clientContext || {},
    );

    static async getInitialProps(req: AppContext): Promise<ApolloInitialProps> {
      const { AppTree, ctx } = req;
      const { statusCode = 500 } = { ...ctx.err, ...ctx.res };

      let appProps = {};
      const { getInitialProps } = WrappedApp;
      if (getInitialProps) appProps = await getInitialProps(req);

      const [language, country] =
        ctx.req?.headers['accept-language']
          ?.split(',')
          .shift()
          ?.split('-') || [];

      const clientContext: ClientContext['clientContext'] = { language, country, statusCode };
      const apollo = initApollo({}, clientContext);
      const apolloState = apollo.cache.extract();

      if (isNode) {
        try {
          const { getDataFromTree } = await import('@apollo/react-ssr');
          await getDataFromTree(
            <AppTree
              apolloState={apolloState}
              clientContext={clientContext}
              pageProps={appProps}
              apolloClient={apollo}
            />,
          );
        } catch (error) {
          // TODO: log me
          if (ctx.res) ctx.res.statusCode = get(error, 'networkError.statusCode', 500);
        }
        Head.rewind();
      }

      return { ...appProps, apolloState, clientContext, pageProps: {} };
    }

    render(): JSX.Element {
      return <WrappedApp apolloClient={this.apolloClient} {...this.props} />;
    }
  };

export default withApollo;
