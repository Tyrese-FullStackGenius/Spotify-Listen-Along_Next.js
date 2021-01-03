// REF: https://nextjs.org/docs/basic-features/built-in-css-support

import "bootstrap/dist/css/bootstrap.css";
import "../public/styles/style-main.css";

import App from "next/app";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default MyApp;
