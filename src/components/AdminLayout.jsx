import PropTypes from "prop-types";
import {Loader} from "./Loader.jsx";
import {HeaderAdmin} from "../pages/Admin/components/HeaderAdmin/HeaderAdmin.jsx";

export const AdminLayout = ({children, loading = true}) => {
  return (
    <>
      <Loader loading={loading}/>
      <HeaderAdmin/>
      <main className='main'>{children}</main>
    </>
  )
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool
};