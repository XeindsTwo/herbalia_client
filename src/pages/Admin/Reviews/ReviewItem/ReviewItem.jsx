import styles from './ReviewItem.module.scss';
import StarRatings from "react-star-ratings/build/star-ratings.js";
import {Checkbox} from "../../../../components/FormFields/Checkbox/Checkbox.jsx";
import {formatDate} from "../../../../utils/dateUtils.js";

export const ReviewItem = ({
                             review,
                             showControls = true,
                             isApproved = true,
                             handleDelete,
                             handleApprove,
                             isVisibleCheckbox = false,
                             isChecked,
                             onChangeCheckbox
                           }) => (
  <li className={styles.item}>
    {showControls && (
      <div className={styles.control}>
        {isApproved && (
          <button className={`${styles.btn} ${styles.approve}`} onClick={() => handleApprove(review)}>
            Одобрить
          </button>
        )}
        <button className={`${styles.btn} ${styles.delete}`} onClick={() => handleDelete(review)}>
          Удалить
        </button>
      </div>
    )}
    {isVisibleCheckbox && (
      <Checkbox bottom={true} isChecked={isChecked} onChange={onChangeCheckbox}>
        Отобразить на главной
      </Checkbox>
    )}
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
    <span className={styles.email}>
            Почта: <a href={`mailto:${review.email}`}>{review.email}</a>
        </span>
    <p>{review.comment}</p>
  </li>
);