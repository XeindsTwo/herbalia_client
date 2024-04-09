import styles from "./Items.module.scss";
import {ReviewItem} from "./Item/ReviewItem.jsx";

export const Items = ({reviews}) => {
  return (
    <ul className={styles.list}>
      {reviews.map(review => (
        <ReviewItem key={review.id} review={review}/>
      ))}
    </ul>
  )
}
