const path = require('path');
const Dotenv = require('dotenv-webpack');

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
  plugins: [
    new Dotenv({
      path: path.join(__dirname, '../../.env'),
      systemvars: false,
    }),
  ],
};
