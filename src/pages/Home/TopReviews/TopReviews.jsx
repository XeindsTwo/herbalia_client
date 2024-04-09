import styles from './TopReviews.module.scss';
import reviewsImg from '../../../assets/images/reviews.svg';
import {useEffect, useRef} from "react";
import axios from "axios";
import 'swiper/css';
import {SwiperReviews} from "./SwiperReviews/SwiperReviews.jsx";
import {ShowMoreButton} from "../../../components/ShowMoreButton/ShowMoreButton.jsx";
import {useQuery} from "react-query";

const fetchReviews = async () => {
  const response = await axios.get('/reviews/main');
  return response.data.reviews;
};

export const TopReviews = () => {
  const swiperRef = useRef();
  const digitalRef = useRef(null);

  const {data: reviews, isLoading, isError} = useQuery('reviews', fetchReviews, {
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });

  if (isError) {
    console.log('Произошла ошибка при загрузке рейтинга отзывов: ', isError);
  }

  useEffect(() => {
    if (digitalRef.current && swiperRef.current) {
      swiperRef.current.pagination.update();
    }
  }, [reviews]);

  return (
    <section className="indent">
      <div className="container">
        <div className={styles.inner}>
          <img className={styles.img} width={450} src={reviewsImg} alt="herbalia отзывы"/>
          <div className={styles.content}>
            <h2 className={`${styles.title} block-title`}>
              Что говорят о нас клиенты?
            </h2>
            {isLoading ? (
              <p>Загрузка отзывов....</p>
            ) : isError ? (
              <p className={styles.empty}>
                Ошибка при загрузке отзывов :/ Пожалуйста, повторите попытку позже
              </p>
            ) : reviews && reviews.length > 0 ? (
              <SwiperReviews reviews={reviews} swiperRef={swiperRef} digitalRef={digitalRef}/>
            ) : (
              <p className={styles.empty}>Отзывов на данный момент нет</p>
            )}
            {!isLoading && reviews && reviews.length > 0 && (
              <div className={styles.navigation}>
                <div className={styles.control}>
                  <button
                    className={`${styles.btn} ${styles.btn_prev}`}
                    type="button"
                    onClick={() => swiperRef.current?.slidePrev()}
                  >
                  </button>
                  <span className={`${styles.pagination} reviews_pagination`} ref={digitalRef}></span>
                  <button
                    className={styles.btn}
                    onClick={() => swiperRef.current?.slideNext()}
                    type="button"
                  >
                  </button>
                </div>
                <ShowMoreButton text={'Смотреть все отзывы'} link={'/reviews'}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};