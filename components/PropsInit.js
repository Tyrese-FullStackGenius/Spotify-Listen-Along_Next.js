import Document, { Head, Home, NextScript } from "next/document";

export default class PropsInit extends Document {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const { html, head, errorHtml, chunks } = context.renderPage();
    return { html, head, errorHtml, chunks, styles, locale, localeDataScript };
  }
}
