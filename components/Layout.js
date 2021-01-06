import Header from "./Header.js";

// ================= //
//      LAYOUT       //
// ================= //

const Layout = (props) => (
  <>
    <div id="tippity-top"></div>

    <Header />
    <div className="container layout-base">
      <div>{props.children}</div>
      <div className="row justify-content-center p-1">
        <div className="container mt-5 pt-5 col-12" id="footer-container">
          <p className="made-with-love">
            made with <i className="fas fa-heart"></i> by{" "}
            <a
              className="portfolio-link"
              href="http://www.tylercsamuelson.com"
              target="_blank"
            >
              tyler samuelson
            </a>{" "}
            <a className="back-to-top-arrow" href="#tippity-top">
              <i className="fas fa-arrow-up fa-sm"></i>
            </a>
          </p>
        </div>
      </div>
    </div>
  </>
);

export default Layout;
