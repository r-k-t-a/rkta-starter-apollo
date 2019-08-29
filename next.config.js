/* eslint-disable import/no-extraneous-dependencies */

const { flow } = require('lodash');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const merge = require('webpack-merge');
const common = require('./config/webpack/config.common.ts');

const compose = flow(withBundleAnalyzer);

module.exports = compose({
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
  target: process.env.TARGET,
  webpack: config => merge(common, config),
});
