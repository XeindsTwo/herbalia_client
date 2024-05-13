import {Swiper, SwiperSlide} from 'swiper/react';
import styles from './SwiperThumbs.module.scss';

export const SwiperThumbs = ({images, onSwiper}) => {
  return (
    <Swiper
      className={styles.thumbs}
      onSwiper={onSwiper}
      spaceBetween={12}
      slidesPerView={4}
      watchslidesvisibility="true"
      watchslidesprogress="true"
    >
      {images.map((image, index) => (
        <SwiperSlide className={styles.thumb} key={index}>
          <img src={image.url} alt={image.name} width={116} height={116}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};