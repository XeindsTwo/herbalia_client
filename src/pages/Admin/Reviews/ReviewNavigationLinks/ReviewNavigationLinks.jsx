import {NavLink} from 'react-router-dom';
import styles from './ReviewNavigationLinks.module.scss';

export const ReviewNavigationLinks = () => {
  return (
    <ul className={styles.buttons}>
      <li>
        <NavLink
          to="/admin/reviews/unapproved"
          className={({isActive}) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          Не одобренные отзывы
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/reviews/approved"
          className={({isActive}) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          Одобренные отзывы
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin/reviews/homepage"
          className={({isActive}) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          Отображение на главной
        </NavLink>
      </li>
    </ul>
  );
};