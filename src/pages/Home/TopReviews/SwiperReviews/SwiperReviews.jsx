import styles from './SwiperReviews.module.scss';
import {Swiper, SwiperSlide} from "swiper/react";
import {Keyboard, Pagination} from "swiper/modules";
import PropTypes from "prop-types";

export const SwiperReviews = ({reviews, swiperRef}) => {
  return (
    <Swiper
      className={styles.swiper}
      slidesPerView={1}
      loop={true}
      autoHeight={true}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
      pagination={{
        el: '.reviews_pagination',
        type: 'custom',
        renderCustom: function (swiper, current, total) {
          return current.toString() + '/' + total.toString();
        },
      }}
      keyboard={{
        enabled: true,
        onlyInViewport: true
      }}
      modules={[Pagination, Keyboard]}
    >
      {reviews.map((review) => (
        <SwiperSlide key={review.id}>
          <p className={styles.text}>“{review.comment}”</p>
          <span className={styles.name}>{review.name}</span>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

SwiperReviews.propTypes = {
  reviews: PropTypes.array.isRequired,
  swiperRef: PropTypes.shape({
    current: PropTypes.object
  }).isRequired
}