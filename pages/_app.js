// REF: https://nextjs.org/docs/basic-features/built-in-css-support

import "bootstrap/dist/css/bootstrap.css";
import "../public/styles/style-main.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
