/* eslint-disable react/no-danger */
import React, { ReactElement } from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import createEmotionServer from 'create-emotion-server';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';

interface Props {
  css: string;
}

class RktaDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const emotionCache = createCache();
    const { extractCritical } = createEmotionServer(emotionCache);

    await Document.getInitialProps(ctx);
    const page = await ctx.renderPage({
      enhanceApp: App => ({ pageProps, ...rest }): ReactElement => {
        return (
          <CacheProvider value={emotionCache}>
            <App {...rest} pageProps={pageProps} />
          </CacheProvider>
        );
      },
    });

    const styles = extractCritical(page.html);
    return { ...page, ...styles };
  }

  render(): ReactElement {
    const { css } = this.props;
    return (
      <Html lang="en">
        <Head prefix="og: http://ogp.me/ns#">
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="theme-color" content="#88c940" />
          <style dangerouslySetInnerHTML={{ __html: css }} />
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
