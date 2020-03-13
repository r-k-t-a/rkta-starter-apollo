import React from 'react';
import Link from 'next/link';
import { Button, Heading, Divider, Text } from '@rkta/ui';

import { Facebook, Twitter, Youtube, Vk } from '@rkta/entypo';

import homePath from '../../path/homePath';

export default (): JSX.Element => {
  return (
    <Text center element="div">
      <Heading color="primary" level={1}>
        404
      </Heading>
      <Heading level={5}>Page Not Found</Heading>
      <Link href={homePath()}>
        <Button blockLevel hard>
          Home Page
        </Button>
      </Link>
      <Link href={homePath()}>
        <Button blockLevel hard>
          Another Page
        </Button>
      </Link>
      <Link href={homePath()}>
        <Button blockLevel hard>
          And Another Page
        </Button>
      </Link>
      <Divider invisible verticalSpace={16} />
      <Button round>
        <Facebook />
      </Button>
      <Button round>
        <Vk />
      </Button>
      <Button round>
        <Twitter />
      </Button>
      <Button round>
        <Youtube />
      </Button>
    </Text>
  );
};
