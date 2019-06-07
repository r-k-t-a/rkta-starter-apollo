import React from 'react';
import Link from 'next/link';
import getConfig from 'next/config';

import localStatePath from '../src/path/localStatePath';

const { GRAPHQL_ENDPOINT_URL } = getConfig().publicRuntimeConfig;

const IndexPage = () => (
  <section>
    Hello I&apos;m index View
    <br />
    <Link href={localStatePath()}>
      <a>Local State Example</a>
    </Link>
    <p>{GRAPHQL_ENDPOINT_URL || 'GRAPHQL_ENDPOINT_URL not defined'}</p>
  </section>
);

export default IndexPage;
