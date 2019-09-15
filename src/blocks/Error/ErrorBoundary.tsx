import React, { Component, ErrorInfo } from 'react';
// import PropTypes from 'prop-types';

// import ErrorPage from './ErrorPage';
// import PopOver from './PopOver';

export default class ErrorBoundary extends Component {
  // eslint-disable-next-line react/static-property-placement
  public static propTypes = {
    // children: PropTypes.node.isRequired,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
  }

  handleClose = (): void => {
    // console.log('handleClose');
    // this.client.purgeErrors();
    // this.forceUpdate();
  };

  render(): JSX.Element {
    return <div>Error boundary</div>;
    // const { error, errorInfo } = this.state;
    // if (error) return <ErrorPage error={error} errorInfo={errorInfo} />;
    // return (
    //   <>
    //     {clientError && (
    //       <PopOver error={clientError} onClose={this.handleClose} key={clientError.type} />
    //     )}
    //     {this.props.children}
    //   </>
    // );
  }
}
