import {Swiper, SwiperSlide} from "swiper/react";
import styles from "./SwiperGallery.module.scss";
import {Keyboard, Navigation, Thumbs} from "swiper/modules";
import {useState} from "react";
import ArrowIcon from "../../../assets/images/icons/product/arrow.svg?react";
import {SwiperThumbs} from "./SwiperThumbs/SwiperThumbs.jsx";

export const SwiperGallery = ({images}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const shouldRenderSwiper = images.length > 1;

  return (
    <div className={styles.gallery}>
      <div className={styles.images}>
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          loop
          speed={600}
          keyboard={{enabled: true, onlyInViewport: true}}
          modules={[Keyboard, Navigation, Thumbs]}
          navigation={{
            prevEl: `.${styles.prev}`,
            nextEl: `.${styles.next}`,
          }}
          thumbs={{swiper: thumbsSwiper}}
          watchslidesvisibility="true"
          watchslidesprogress="true"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image.url} alt={image.name}/>
            </SwiperSlide>
          ))}
          {shouldRenderSwiper && (
            <div className={styles.navigation}>
              <button className={`${styles.arrow} ${styles.prev}`}>
                <ArrowIcon/>
              </button>
              <button className={`${styles.arrow} ${styles.next}`}>
                <ArrowIcon/>
              </button>
            </div>
          )}
        </Swiper>
      </div>
      {shouldRenderSwiper && (
        <SwiperThumbs images={images} onSwiper={setThumbsSwiper}/>
      )}
    </div>
  );
};