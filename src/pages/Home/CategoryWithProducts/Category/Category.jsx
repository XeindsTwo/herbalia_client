import React, {useRef} from 'react';
import styles from './Category.module.scss';
import {Product} from "./Product/Product.jsx";
import {formatPrice} from "../../../../utils/priceUtils.js";
import 'swiper/css';
import {Swiper, SwiperSlide} from "swiper/react";
import {Keyboard, Navigation, Pagination} from "swiper/modules";
import {Link} from "react-router-dom";
import Arrow from '../../../../assets/images/icons/arrow-swiper.svg?react';

export const Category = ({category, favorites, handleToggleFavorite}) => {
  const limitedProducts = category.products.slice(0, 6);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className={styles.category}>
      <div className={styles.top}>
        <div className={styles.left}>
          <h2 className={styles.name}>{category.name}</h2>
          <span>{category.subtitle}</span>
        </div>
        <div className={styles.counters}>
          <span>от {formatPrice(category.minPrice)}</span>
          <span>{category.totalCount} шт</span>
        </div>
      </div>
      <Swiper
        keyboard={{
          enabled: true,
          onlyInViewport: true
        }}
        modules={[Pagination, Keyboard, Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        slidesPerGroup={4}
        onSwiper={(swiper) => {
          setTimeout(() => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          });
        }}
      >
        {limitedProducts.map(product => (
          <SwiperSlide key={product.id}>
            <Product
              product={product}
              categoryId={category.id}
              favorites={favorites}
              handleToggleFavorite={handleToggleFavorite}
            />
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <Link className={styles.more} to={`/catalog/${category.id}`}>
            <span className={styles.circle}>
              <Arrow/>
            </span>
            Показать больше
          </Link>
        </SwiperSlide>
      </Swiper>
      <button
        ref={prevRef}
        className={`${styles.btn} ${styles.btn_prev}`}
        type="button"
      >
      </button>
      <button
        ref={nextRef}
        className={`${styles.btn}`}
        type="button"
      >
      </button>
    </div>
  );
};