import PropTypes from 'prop-types';
import styles from './AdminButton.module.scss';

export const AdminButton = ({onClick, children}) => {
  return (
    <button className={styles.btn} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

AdminButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};