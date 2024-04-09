import StarRatings from "react-star-ratings/build/star-ratings.js";
import styles from './ReviewItem.module.scss';
import {formatDate} from "../../../../../utils/dateUtils.js";

export const ReviewItem = ({review}) => {
  return (
    <li className={styles.item}>
      <div className={styles.head}>
        <StarRatings
          rating={review.rating}
          starRatedColor="#f67280"
          starEmptyColor="#f0dbde"
          numberOfStars={5}
          name='rating'
          starDimension="20px"
          starSpacing="1px"
        />
        <time className={styles.date}>{formatDate(review.created_at)}</time>
      </div>
      <span className={styles.name}>{review.name}</span>
      <p>{review.comment}</p>
    </li>
  )
}
