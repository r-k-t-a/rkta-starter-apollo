/* eslint-disable react/no-danger */
import React from 'react';
import { NextPageContext } from 'next';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import {
  NextComponentType,
  AppContextType,
  AppInitialProps,
  AppPropsType,
  RenderPageResult,
} from 'next-server/dist/lib/utils';
import createEmotionServer from 'create-emotion-server';
import createCache from '@emotion/cache';

interface InitialProps extends DocumentInitialProps {
  css: string;
}

const getStatusCode = ({ err, res }: NextPageContext): number => {
  const { statusCode = 500 } = { ...err, ...res };
  return statusCode;
};

class RktaDocument extends Document<InitialProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<InitialProps> {
    const emotionCache = createCache();
    const { extractCritical } = createEmotionServer(emotionCache);
    const originalRenderPage = ctx.renderPage;
    const statusCode = getStatusCode(ctx);

    ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> =>
      originalRenderPage({
        enhanceApp: (
          App: NextComponentType<
            AppContextType,
            AppInitialProps,
            AppPropsType & { statusCode?: number }
          >,
        ) => (props: AppPropsType): JSX.Element => <App {...props} statusCode={statusCode} />,
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
