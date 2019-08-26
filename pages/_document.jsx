/* eslint-disable react/no-danger */
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from 'create-emotion-server';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';
import get from 'lodash/get';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const emotionCache = createCache();
    const { extractCritical } = createEmotionServer(emotionCache);

    await Document.getInitialProps(ctx);
    const page = ctx.renderPage({
      enhanceApp: App => ({ pageProps, ...rest }) => {
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

  render() {
    return (
      <Html lang={this.props.lang}>
        <Head prefix="og: http://ogp.me/ns#">
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="theme-color" content="#88c940" />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
