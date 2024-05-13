import styles from './ButtonsActions.module.scss';
import SearchIcon from '../../../assets/images/icons/header/search.svg?react';
import HeartIcon from '../../../assets/images/icons/header/heart.svg?react';
import BasketIcon from '../../../assets/images/icons/header/basket.svg?react';
import {Favorites} from "../../Favorites/Favorites.jsx";
import {Link} from "react-router-dom";

export const ButtonsActions = () => {
  const {favoritesCount} = Favorites();

  return (
    <ul className={styles.list}>
      <li>
        <button className={styles.link} type="button">
          <SearchIcon/>
        </button>
      </li>
      <li>
        <Link className={styles.link} to='/favorites'>
          <HeartIcon/>
          <span className={`${styles.counter} ${favoritesCount > 0 ? styles.active : ''}`}>
            {favoritesCount}
          </span>
        </Link>
      </li>
      <li>
        <a className={styles.link} href="">
          <BasketIcon/>
          <span className={styles.counter}>10</span>
        </a>
      </li>
    </ul>
  )
};