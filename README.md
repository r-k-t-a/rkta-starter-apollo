# RKTA Starter Apollo

A React-apollo app preconfigured for serverless Zeit Now deployment.

## To use locally
- Create `.env` and `.env.serverless` from `.env.sample` and `.env.serverless.sample`
- Start dev server: `yarn dev`
- Start in production mode `yarn start`

## Deploy to now
1. Configure `now.json`
2. Run `yarn deploy`

## Environment variables
1. For genral use see [now docs](https://zeit.co/docs/v2/deployments/environment-variables-and-secrets/)
2. To expose some env variables to the client see `config/webpack/config.common.js`.
