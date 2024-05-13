import React from 'react';
import {Breadcrumbs} from "../../components/Breadcrumbs/Breadcrumbs.jsx";
import {Layout} from "../../components/Layout.jsx";
import styles from "./FavoritesPage.module.scss";
import HeartIcon from '../../assets/images/icons/heart.svg?react';
import {useQuery} from 'react-query';
import axios from 'axios';
import {Link} from "react-router-dom";
import {formatPrice} from "../../utils/priceUtils.js";
import {Favorites} from "../../components/Favorites/Favorites.jsx";

const getFavorites = async () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const {data} = await axios.post('/favorites', {productIds: favorites});
  return data;
};

export const FavoritesPage = () => {
  const {favorites, handleToggleFavorite} = Favorites();
  const {data, isLoading, isError} = useQuery('favorites', getFavorites);

  return (
    <Layout>
      <section className={'indent indent--breadcrumbs indent--footer'}>
        <div className="container">
          <Breadcrumbs current={'Избранное'}/>
          <h1 className={'title'}>Избранные товары</h1>
          {isLoading && (
            <div className={styles.empty}>
              <p className={styles.info}>Загрузка товаров...</p>
            </div>
          )}
          {isError && (
            <div className={styles.empty}>
              <p className={styles.info}>Ошибка при загрузке товаров</p>
            </div>
          )}
          {data && data.favorites && data.favorites.length > 0 ? (
            <ul className={styles.list}>
              {data.favorites.map((product) => (
                <li className={styles.item} key={product.id}>
                  <button
                    className={`like ${favorites.includes(product.id) ? 'active' : ''}`}
                    type="button"
                    onClick={() => handleToggleFavorite(product.id)}
                  >
                    <HeartIcon/>
                  </button>
                  <Link className={styles.link_img} to={`/catalog/${product.category_id}/${product.id}`}>
                    <img
                      className={styles.img}
                      src={product.images[0].url}
                      alt={product.name}
                      width="275"
                      height="300"
                      loading={"lazy"}
                    />
                  </Link>
                  <Link className={styles.name_product} to={'/'}>
                    {product.name}
                  </Link>
                  <p className={styles.delivery}>
                    <span>Бесплатная доставка через 2ч</span>
                    <span className={styles.time}>с 10:00 до 23:00</span>
                  </p>
                  <span className={styles.price}>{formatPrice(product.price)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.empty}>
              <p className={styles.info}>Здесь будут товары, которые вам понравились</p>
              <p className={styles.text}>
                Нажимайте на кнопку <HeartIcon width={18}/>, <br/> чтобы сохранять товары в избранное
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}