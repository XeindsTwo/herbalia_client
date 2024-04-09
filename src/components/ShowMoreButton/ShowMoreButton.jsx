import styles from './ShowMoreButton.module.scss';
import PropTypes from "prop-types";
import ArrowCircle from '../../assets/images/icons/arrow-circle.svg?react';

export const ShowMoreButton = ({text, link}) => {
  return (
    <a className={styles.link} href={link}>
      {text}
      <span className={styles.circle}>
        <ArrowCircle/>
      </span>
    </a>
  )
}

ShowMoreButton.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
}