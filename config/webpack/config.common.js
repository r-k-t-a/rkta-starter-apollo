/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const dotenv = require('dotenv');
const { EnvironmentPlugin } = require('webpack');
const pick = require('lodash/pick');

const envFilename = process.env.TARGET === 'serverless' ? '.env.serverless' : '.env';
const result = dotenv.config({ path: path.join(__dirname, '../../', envFilename) });

if (result.error) {
  throw result.error;
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
