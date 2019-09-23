import React, { Component, ErrorInfo, ReactNode } from 'react';

import ErrorPage from './UnknownError';
import PopUp from './PopUp/Wrapper';

interface Props {
  children: ReactNode;
}

interface State {
  message?: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  state = {
    message: undefined,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.warn(errorInfo);
    const message = error.message || error.toString();
    this.setState({ message });
  }

  render(): JSX.Element {
    const { message } = this.state;
    if (message) return <ErrorPage message={message} />;
    return (
      <>
        {this.props.children}
        <PopUp />
      </>
    );
  }
}
