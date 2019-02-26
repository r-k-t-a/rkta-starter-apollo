import React from 'react';
import Head from 'next/head';
import { getDataFromTree } from 'react-apollo';
import get from 'lodash/get';

import initApollo from './initApollo';

export default App =>
  class Apollo extends React.Component {
    static displayName = 'withApollo(App)';

    static async getInitialProps(req) {
      const { Component, router } = req;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(req);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo();
      if (!process.browser) {
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

    constructor(props) {
      super(props);
      // eslint-disable-next-line react/prop-types
      this.apolloClient = initApollo(props.apolloState);
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
