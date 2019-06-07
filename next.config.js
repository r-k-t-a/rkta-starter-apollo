// eslint-disable-next-line import/no-extraneous-dependencies
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
// eslint-disable-next-line import/no-extraneous-dependencies
const merge = require('webpack-merge');
const common = require('./config/webpack/config.common.js');

function getPublicRuntimeConfig(deploymentID) {
  switch (deploymentID) {
    case 'now': {
      return {
        GRAPHQL_ENDPOINT_URL: `http://broadhost.serverless/graphql/${deploymentID}`,
      };
    }
    default: {
      return {
        GRAPHQL_ENDPOINT_URL: 'http://localhost:3000/graphql',
      };
    }
  }
}

module.exports = withBundleAnalyzer({
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },
  publicRuntimeConfig: getPublicRuntimeConfig(process.env.DEPLOYMENT_ID),
  target: process.env.TARGET,
  webpack: config => merge(common, config),
});
