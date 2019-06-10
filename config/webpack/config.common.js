/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const { EnvironmentPlugin } = require('webpack');
const pick = require('lodash/pick');

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
