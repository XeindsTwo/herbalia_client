import styles from './ButtonsActions.module.scss';
import SearchIcon from '../../../assets/images/icons/header/search.svg?react';
import HeartIcon from '../../../assets/images/icons/header/heart.svg?react';
import BasketIcon from '../../../assets/images/icons/header/basket.svg?react';
import {Favorites} from "../../Favorites/Favorites.jsx";
import {Link} from "react-router-dom";
import React, {useState} from "react";

export const ButtonsActions = ({onSearchClick}) => {
  const {favoritesCount} = Favorites();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchClick = () => {
    if (isSearchActive) {
      setIsSearchActive(false);
    } else {
      if (onSearchClick) {
        onSearchClick();
      }
      setIsSearchActive(true);
    }
  };

  return (
    <ul className={styles.list}>
      <li>
        <button
          className={`${styles.link} ${isSearchActive ? styles.active : ''}`}
          type="button"
          onClick={handleSearchClick}
        >
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