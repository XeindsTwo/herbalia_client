import {useSelector} from 'react-redux';
import React, {useState, useEffect} from 'react';
import styles from './ButtonsActions.module.scss';
import SearchIcon from '../../../assets/images/icons/header/search.svg?react';
import HeartIcon from '../../../assets/images/icons/header/heart.svg?react';
import BasketIcon from '../../../assets/images/icons/header/basket.svg?react';
import {Link} from "react-router-dom";
import {Favorites} from "../../CartAndFavorites/Favorites.jsx";

export const ButtonsActions = ({onSearchClick}) => {
  const {favoritesCount} = Favorites();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  const cartItems = useSelector(state => state.cart.cartItems);

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive);
    if (onSearchClick) {
      onSearchClick();
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
        <Link className={styles.link} to="/cart">
          <BasketIcon/>
          <span className={`${styles.counter} ${cartItemCount > 0 ? styles.active : ''}`}>{cartItemCount}</span>
        </Link>
      </li>
    </ul>
  )
};