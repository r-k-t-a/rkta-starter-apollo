/* eslint-disable react/no-danger */
import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import createEmotionServer from 'create-emotion-server';
import createCache from '@emotion/cache';

import { getStatusCode } from './_error';

interface InitialProps extends DocumentInitialProps {
  css: string;
}

class RktaDocument extends Document<InitialProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<InitialProps> {
    const emotionCache = createCache();
    const { extractCritical } = createEmotionServer(emotionCache);
    const originalRenderPage = ctx.renderPage;
    const statusCode = getStatusCode(ctx);

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => (props): JSX.Element => <App {...props} statusCode={statusCode} />,
      });

    const initialProps = await Document.getInitialProps(ctx);

    const { css } = extractCritical(initialProps.html);
    return { ...initialProps, css };
  }

  render(): JSX.Element {
    const { css } = this.props;
    return (
      <Html lang="en">
        <Head prefix="og: http://ogp.me/ns#">
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="theme-color" content="#88c940" />
          <style
            dangerouslySetInnerHTML={{ __html: css }}
            data-emotion="css-global"
            type="text/css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default RktaDocument;
