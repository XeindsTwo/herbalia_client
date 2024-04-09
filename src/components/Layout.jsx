import PropTypes from "prop-types";
import {Header} from "./Header/Header.jsx";
import {Footer} from "./Footer/Footer.jsx";
import {Loader} from "./Loader.jsx";

export const Layout = ({children, showHeader = true, showFooter = true, loading = true}) => {
  return (
    <>
      <Loader loading={loading}/>
      {showHeader && <Header/>}
      <main>{children}</main>
      {showFooter && <Footer/>}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showFooter: PropTypes.bool,
  loading: PropTypes.bool
};