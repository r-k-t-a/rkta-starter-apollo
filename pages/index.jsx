import React from 'react';
import Link from 'next/link';

import localStatePath from '../src/path/localStatePath';

const IndexPage = () => (
  <section>
    Hello I&apos;m index View
    <br />
    <Link href={localStatePath()}>
      <a>Local State Example</a>
    </Link>
  </section>
);

export default IndexPage;
