import React from 'react';
import { Error404, UnknownError } from '../src/blocks/Error';

interface Props {
  statusCode: number;
}

const ErrorPage: React.FunctionComponent<Props> = ({ statusCode }: Props) =>
  statusCode === 404 ? <Error404 /> : <UnknownError statusCode={statusCode} />;

export default ErrorPage;
