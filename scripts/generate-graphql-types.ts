import { spawn } from 'child_process';
import path from 'path';

const buildDir = path.join(__dirname, '../src/@types/apollo-client/');
const localSchemaFile = path.join(buildDir, 'server-schema.json');
const outputFile = path.join(buildDir, 'graphql-types.d.ts');

export const generateTypes = (): void => {
  spawn('npx', [
    'apollo',
    'client:codegen',
    `--localSchemaFile=${localSchemaFile}`,
    '--target=typescript',
    '--addTypename',
    '--outputFlat',
    outputFile,
  ]);
};

if (require.main === module) generateTypes();
