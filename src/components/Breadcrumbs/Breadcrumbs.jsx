import styles from './Breadcrumbs.module.scss';
import {Link} from "react-router-dom";
import {arrayOf, node, oneOfType, shape, string} from "prop-types";

export const Breadcrumbs = ({current, additional}) => {
  const isAdditionalExist = additional && additional.length > 0;

  return (
    <ul className={styles.list}>
      <li className={styles.item}>
        <Link className={`${styles.link} ${styles.link_nav}`} to='/'>Доставка цветов в Белореченск</Link>
      </li>
      {additional?.map((item, index) => (
        <li className={styles.item} key={index}>
          <Link
            className={`${styles.link} ${current === item.label ? styles.active : styles.link_nav}`}
            to={item.to}
          >
            {item.label}
          </Link>
        </li>
      ))}
      <li className={styles.item}>
        <span className={`${styles.link} ${styles.active}`}>{current}</span>
      </li>
    </ul>
  )
}

Breadcrumbs.propTypes = {
  current: string.isRequired,
  additional: oneOfType([
    arrayOf(node),
    arrayOf(shape({label: string.isRequired, to: string.isRequired}))
  ])
}