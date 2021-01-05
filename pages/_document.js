// REF: https://nextjs.org/docs/basic-features/built-in-css-support
// REF: https://nextjs.org/docs/advanced-features/custom-document
// REF: https://formatjs.io/docs/react-intl/

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
      <html lang="en">
        <Head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Listen Along is bringing back collaborative listening rooms. Intimate opportunities to share and experience music with your friends. A shared queue can be added to and edited by anyone present in the listening room. Vote songs up the queue and jam synchronously together via Spotify—-even when you can't be together."
          />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
            crossorigin="anonymous"
          />

          <link
            rel="shortcut icon"
            href="/images/listen-along-favicon-dark.svg"
          />
          <meta
            name="viewport"
            content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
          />
          <script
            src="https://kit.fontawesome.com/0f84f97a69.js"
            crossOrigin="anonymous"
          ></script>
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
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
            crossorigin="anonymous"
          ></script>
        </body>
      </html>
    );
  }
}
