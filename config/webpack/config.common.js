// eslint-disable-next-line import/no-extraneous-dependencies
const { EnvironmentPlugin } = require('webpack');

const { GRAPHQL_ENDPOINT_URL } = process.env;

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
  plugins: [new EnvironmentPlugin({ GRAPHQL_ENDPOINT_URL })],
};
