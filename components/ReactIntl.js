import React from "react";
import { IntlProvider, addLocaleData, injectIntl } from "react-intl";

// * note: We need to register React-Intl's locale data for the user's particular locale in the browser. This locale data gets added to the page by our _document.js located inside of Pages. This only happens once, on initial page load of the browser.
if (typeof window !== "undefined" && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach((lang) => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

export default (Page) => {
  const IntlPage = injectIntl(Page);
  return class PageWithIntl extends React.Component {
    static async getInitialProps(context) {
      let props;
      if (typeof Page.getInitialProps === "function") {
        props = await Page.getInitialProps(context);
      }

      // Retrieve * locale * and * messages * from the req object. In the browser, use the same values that the server serialized
      const { req } = context;
      const { locale, messages } = req || window.__NEXT_DATA__.props;

      // * note: We need to always update the Current Time on the page load because the <IntlProvider> will be a new instance even with pushState routing
      const now = Date.now();

      return { ...props, locale, messages, now };
    }

    render() {
      const { locale, messages, now, ...props } = this.props;
      return (
        <IntlProvider locale={locale} messages={messages} initialNow={now}>
          <IntlPage {...props} />
        </IntlProvider>
      );
    }
  };
};
