import Header from "./Header.js";

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
