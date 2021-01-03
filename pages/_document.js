// REF: https://nextjs.org/docs/basic-features/built-in-css-support

import Document, { Head, Main, NextScript } from "next/document";

// * note: This document (which is SSR-only) needs to be customized to expose the locale data for the user's locale for React Intl to work in the browser.
export default class IntlDocument extends Document {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const {
      req: { locale, localeDataScript },
    } = context;
    const { html, head, errorHtml, chunks } = context.renderPage();
    return { html, head, errorHtml, chunks, locale, localeDataScript };
  }

  render() {
    return (
      <html>
        <Head>
          <meta
            name="description"
            content="Listen Along is bringing back collaborative listening rooms. Intimate opportunities to share and experience music with your friends. A shared queue can be added to and edited by anyone present in the listening room. Vote songs up the queue and jam synchronously together via Spotify—-even when you can't be together."
          />
          <link
            rel="shortcut icon"
            href="/images/listen-along-wordmark-dark.svg"
          />
          <meta
            name="viewport"
            content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
          />
        </Head>
        <body className="custom_class">
          {this.props.customValue}
          <Main />
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript,
            }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
