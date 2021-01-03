// REF: https://nextjs.org/docs/basic-features/built-in-css-support

import "../public/styles/style-main.css";
import { Provider } from "react-redux";
import { initStore } from "../store/store.js";

// import App from "next/app";

const store = initStore();

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default MyApp;
