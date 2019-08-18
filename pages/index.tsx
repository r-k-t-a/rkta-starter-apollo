import React from 'react';
import Link from 'next/link';

import localStatePath from '../src/path/localStatePath';

const IndexPage = (): React.ReactNode => (
  <section>
    Hello I&apos;m index View
    <br />
    <Link href={localStatePath()}>
      <a>Local State Example</a>
    </Link>
    <p>{process.env.GRAPHQL_ENDPOINT_URL || 'GRAPHQL_ENDPOINT_URL not defined'}</p>
  </section>
);

export default IndexPage;
