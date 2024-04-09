import styles from "./RatingReviews.module.scss";
import control from "../../assets/images/control.svg";
import axios from "axios";
import {useQuery} from "react-query";

const fetchAverageRating = async () => {
  const response = await axios.get('/reviews/average-rating');
  return response.data.averageRating;
};

export const RatingReviews = ({left}) => {
  const {data: averageRating, isLoading, error} = useQuery('averageRating', fetchAverageRating, {
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });

  if (error) {
    console.log('Произошла ошибка при загрузке рейтинга отзывов: ', error);
  }

  return (
    <div className={`${styles.decor} ${left ? styles.left : ''}`}>
      <span className={styles.number}>
        {isLoading ? '...' : (error ? 'NaN' : averageRating)}
      </span>
      <img src={control} width="260" height="85" alt="контроль качества"/>
    </div>
  )
}