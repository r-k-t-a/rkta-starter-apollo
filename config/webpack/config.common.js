/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

const dotenv = require('dotenv');
const { EnvironmentPlugin } = require('webpack');
const pick = require('lodash/pick');

if (process.env.TARGET !== 'serverless') {
  const result = dotenv.config();
  if (result.error) throw result.error;
}

const pickKeys = ['GRAPHQL_ENDPOINT_URL'];
const publicKeys = pick(process.env, pickKeys);

module.exports = {
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
  plugins: [new EnvironmentPlugin(publicKeys)],
};
