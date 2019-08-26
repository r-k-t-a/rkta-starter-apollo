import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { Text } from '@rkta/ui';

const DefaultLayout = ({ children }): ReactElement => <main>{children}</main>;

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
