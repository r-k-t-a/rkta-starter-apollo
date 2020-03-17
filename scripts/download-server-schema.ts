/* eslint-disable import/no-extraneous-dependencies */
import { spawn } from 'child_process';
import path from 'path';
import dotenv from 'dotenv';

const buildDir = path.join(__dirname, '../src/@types/apollo-client/');
const localSchemaFile = path.join(buildDir, 'server-schema.json');

const result = dotenv.config();
if (result.error) throw result.error;

const { GRAPHQL_ENDPOINT_URL } = process.env;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const downloadSchema = (callback?: (...args: any[]) => void): void => {
  const child = spawn('npx', [
    'apollo',
    'client:download-schema',
    `--endpoint=${GRAPHQL_ENDPOINT_URL}`,
    localSchemaFile,
    '--excludes=src/**/*.{ts,tsx,graphql}',
  ]);

  if (callback) {
    child.on('close', callback);
  }
};

if (require.main === module) downloadSchema();
