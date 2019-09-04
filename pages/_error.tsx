import React from 'react';
import ErrorPage from '../src/blocks/ErrorBoundary/ErrorPage';

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    if (res && res.statusCode === 404) {
      return {
        error: {
          message: 'Not found',
          statusCode: res.statusCode,
        },
      };
    }
    return { error: err };
  }

  render() {
    return <ErrorPage {...this.props} />;
  }
}

export default Error;
