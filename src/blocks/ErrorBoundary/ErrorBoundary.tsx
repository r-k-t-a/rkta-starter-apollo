import React, { Component, , ErrorInfo } from 'react';
import PropTypes from 'prop-types';

import ErrorPage from './ErrorPage';
import PopOver from './PopOver';

export default class ErrorBoundary extends Component {
  // eslint-disable-next-line react/static-property-placement
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = { error: null, errorInfo: null };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
  }

  handleClose = (): void => {
    console.log('handleClose');
    // this.client.purgeErrors();
    // this.forceUpdate();
  };


  render() {
    const { error, errorInfo } = this.state;
    if (error) return <ErrorPage error={error} errorInfo={errorInfo} />;
    const [clientError] = this.client.getErrorsList();
    return (
      <>
        {clientError && (
          <PopOver error={clientError} onClose={this.handleClose} key={clientError.type} />
        )}
        {this.props.children}
      </>
    );
  }
}

ErrorBoundary