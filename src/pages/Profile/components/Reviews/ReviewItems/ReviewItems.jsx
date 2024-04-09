import styles from "./ReviewItems.module.scss";
import {formatDate} from "../../../../../utils/dateUtils.js";
import StarRatings from "react-star-ratings/build/star-ratings.js";

export const ReviewItems = ({reviews, onOpenModal}) => {
  const handleOpenModal = (id) => {
    onOpenModal(id);
  };

  return (
    <>
      {reviews.length > 0 ? (
        <ul className={styles.list}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.item}>
              <button
                className={styles.delete}
                onClick={() => handleOpenModal(review.id)}
              >
                Удалить свой отзыв
              </button>
              <StarRatings
                rating={review.rating}
                starRatedColor="#f67280"
                starEmptyColor="#f0dbde"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="1px"
              />
              <time className={styles.date}>{formatDate(review.created_at)}</time>
              <p className="review-comment">{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Отзывов пока нет</p>
      )}
    </>
  );
};