/* eslint-disable import/no-extraneous-dependencies */
import watch from 'node-watch';
import path from 'path';
import debounce from 'lodash/debounce';

import { downloadSchema } from './download-server-schema';
import { generateTypes } from './generate-graphql-types';

const watchDir = path.join(__dirname, '../src');

function triggerGenerate(): void {
  downloadSchema(generateTypes);
}

const debouncedTrigger = debounce(triggerGenerate, 500);

const watchOptions = {
  recursive: true,
  filter: (filePath: string): boolean => /\.(graphql|tsx)/.test(filePath),
};

debouncedTrigger();

setInterval(debouncedTrigger, 15000);

watch(watchDir, watchOptions, debouncedTrigger);
