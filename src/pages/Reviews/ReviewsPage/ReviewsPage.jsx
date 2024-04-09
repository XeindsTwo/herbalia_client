import {Layout} from "../../../components/Layout.jsx";
import {Breadcrumbs} from "../../../components/Breadcrumbs/Breadcrumbs.jsx";
import styles from './ReviewsPage.module.scss';
import axios from "axios";
import {useCallback, useMemo, useState} from "react";
import {Items} from "./Items/Items.jsx";
import {Modal} from "../../../components/ModalWindows/Modal.jsx";
import ReviewBookIcon from '../../../assets/images/icons/review-book.svg?react';
import {useQuery} from 'react-query';
import {Link} from "react-router-dom";
import {AuthContent} from "../../../utils/AuthContent.jsx";
import {RatingReviews} from "../../../components/RatingReviews/RatingReviews.jsx";

export const ReviewsPage = () => {
  const {data, error, isLoading} = useQuery('reviews', async () => {
    const response = await axios.get('/reviews/page');
    return response.data;
  }, {
    refetchOnWindowFocus: false,
    keepPreviousData: true
  });

  const [isOpenModal, setIsOpenModal] = useState(false);
  const {reviews} = data || {};

  function formatReviewCount(number) {
    const cases = [2, 0, 1, 1, 1, 2];
    return `Всего ${number} отзыв${['', 'а', 'ов'][number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]]}`;
  }

  const formattedReviewCount = useMemo(() => formatReviewCount(reviews ? reviews.length : 0), [reviews]);

  const openModal = useCallback(() => {
    setIsOpenModal(true);
    document.body.classList.add('body--active');
  }, []);

  return (
    <Layout>
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}/>
      <section className={'indent indent--breadcrumbs indent--footer'}>
        <div className="container">
          <Breadcrumbs current={'Отзывы'}/>
          <div className={styles.top}>
            <h1 className={`${styles.title} title`}>Отзывы</h1>
            <button className={styles.rules} onClick={openModal} type={"button"}>
              <ReviewBookIcon className={styles.icon}/>
              Правила публикации отзывов
            </button>
          </div>
          <RatingReviews/>
          <div className={styles.actions}>
            <AuthContent
              authenticated={
                <>
                  <Link className={styles.actions_link} to="/reviews/reviews-form">Написать отзыв</Link>
                  <Link className={styles.actions_link} to="/reviews/improvement-form">Предложить улучшения</Link>
                </>
              }
              unauthenticated={
                <>
                  <p className={styles.actions_text}>
                    Вы не можете оставлять отзыв
                    <br/>
                    Чтоб сделать это - <Link to="/login">войдите</Link> или <Link to="/register">зарегистрируйтесь</Link>
                  </p>
                </>
              }
            />
          </div>
          {error && <div>Произошла ошибка при загрузке отзывов</div>}
          <div className={styles.inner}>
            <div className={styles.left}>
              <span className={styles.quantity}>
                {isLoading ? 'Загрузка отзывов...' : formattedReviewCount}
              </span>
            </div>
            <Items reviews={reviews || []}/>
          </div>
        </div>
      </section>
    </Layout>
  );
}
