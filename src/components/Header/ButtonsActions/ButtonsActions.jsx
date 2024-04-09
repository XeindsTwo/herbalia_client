import styles from './ButtonsActions.module.scss';
import SearchIcon from '../../../assets/images/icons/header/search.svg?react';
import HeartIcon from '../../../assets/images/icons/header/heart.svg?react';
import BasketIcon from '../../../assets/images/icons/header/basket.svg?react';

export const ButtonsActions = () => {
  return (
    <ul className={styles.list}>
      <li>
        <button className={styles.link} type="button">
          <SearchIcon/>
        </button>
      </li>
      <li>
        <a className={styles.link} href="">
          <HeartIcon/>
          <span className={styles.counter}>1</span>
        </a>
      </li>
      <li>
        <a className={styles.link} href="">
          <BasketIcon/>
          <span className={`${styles.counter} ${styles.active}`}>10</span>
        </a>
      </li>
    </ul>
  )
}
