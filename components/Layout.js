import Header from "./Header.js";
import Head from "next/head";

// ================= //
//      LAYOUT       //
// ================= //

const Layout = (props) => (
  <div className="layout-base">
    <Header />
    <div>{props.children}</div>
  </div>
);

export default Layout;
