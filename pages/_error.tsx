import React from 'react';
import { NextPageContext } from 'next';
import { Error404, UnknownError } from '../src/blocks/Error';

interface Props {
  statusCode: number;
}

export const getStatusCode = ({ err, res }: NextPageContext): number => {
  const { statusCode = 500 } = { ...err, ...res };
  return statusCode;
};

class ErrorPage extends React.Component<Props> {
  static getInitialProps(ctx: NextPageContext): Props {
    const statusCode = getStatusCode(ctx);
    return { statusCode };
  }

  render(): JSX.Element {
    const { statusCode } = this.props;
    console.log('render', statusCode);
    return statusCode === 404 ? <Error404 /> : <UnknownError statusCode={statusCode} />;
  }
}

export default ErrorPage;
