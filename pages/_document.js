import Document, { Head, Main, NextScript } from "next/document";

export default class IntlDocument extends Document {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const {
      req: { locale, localeDataScript },
    } = context;
    const { html, head, errorHtml, chunks } = context.renderPage();
    return { html, head, errorHtml, chunks, styles, locale, localeDataScript };
  }

  render() {
    return (
      <html>
        <Head>
          <title>
            Listen Along - A Collaborative Listening Room (Powered by Spotify)
          </title>
          <meta
            name="description"
            content="A collaborative listening environment powered by Spotify"
          />
          <link rel="shortcut icon" href="/static/c-icon-128.png" />
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
