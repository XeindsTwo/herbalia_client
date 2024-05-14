import React from 'react';
import {Link} from "react-router-dom";
import styles from './Product.module.scss';
import HeartIcon from "../../../../../assets/images/icons/heart.svg?react";
import {formatPrice} from "../../../../../utils/priceUtils.js";

export const Product = ({product, categoryId, favorites, handleToggleFavorite}) => (
  <li className={styles.item}>
    <button
      className={`like ${favorites.includes(product.id) ? 'active' : ''}`}
      type="button"
      onClick={() => handleToggleFavorite(product.id)}
    >
      <HeartIcon/>
    </button>
    <Link className={styles.link_img} to={`/catalog/${categoryId}/${product.id}`}>
      <img
        className={styles.img}
        src={product.images[0].url}
        alt={product.name}
        width={280}
        height="300"
      />
    </Link>
    <Link className={styles.name_product} to={`/catalog/${categoryId}/${product.id}`}>
      {product.name}
    </Link>
    <p className={styles.delivery}>
      <span>Бесплатная доставка через 2ч</span>
      <span className={styles.time}>с 10:00 до 23:00</span>
    </p>
    <span className={styles.price}>{formatPrice(product.price)}</span>
  </li>
);