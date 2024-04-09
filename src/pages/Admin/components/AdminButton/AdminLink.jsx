import PropTypes from 'prop-types';
import styles from './AdminButton.module.scss';
import {Link} from "react-router-dom";

export const AdminLink = ({children, path}) => {
  return (
    <Link className={styles.btn} to={path}>
      {children}
    </Link>
  );
};

AdminLink.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};