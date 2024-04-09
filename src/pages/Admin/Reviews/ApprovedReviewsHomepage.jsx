import {useState, useEffect} from 'react';
import {AdminLayout} from '../../../components/AdminLayout.jsx';
import {ReviewNavigationLinks} from './ReviewNavigationLinks/ReviewNavigationLinks.jsx';
import {ReviewItem} from './ReviewItem/ReviewItem.jsx';
import {useQuery, useQueryClient} from 'react-query';
import styles from './Reviews.module.scss';
import axios from 'axios';
import {toast} from 'react-toastify';

export const ApprovedReviewsHomepage = () => {
  const queryClient = useQueryClient();
  const {data: approvedReviews, isLoading, isError} = useQuery(
    'approvedReviewsHomepage',
    fetchApprovedReviews
  );
  const [checkedReviews, setCheckedReviews] = useState([]);
  const [isChangesMade, setIsChangesMade] = useState(false);

  useEffect(() => {
    if (approvedReviews) {
      const newCheckedReviews = approvedReviews
        .filter((review) => review.display_on_homepage)
        .map((review) => review.id);
      setCheckedReviews(newCheckedReviews);
    }
  }, [approvedReviews]);

  async function fetchApprovedReviews() {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get('/admin/reviews/approved', config);
      return response.data;
    } catch (error) {
      console.error('Ошибка при загрузке одобренных отзывов на главной странице:', error);
      throw new Error('Ошибка при загрузке одобренных отзывов на главной странице');
    }
  }

  const handleCheckboxChange = (reviewId) => {
    setIsChangesMade(true);
    setCheckedReviews((prevCheckedReviews) =>
      prevCheckedReviews.includes(reviewId)
        ? prevCheckedReviews.filter((id) => id !== reviewId)
        : [...prevCheckedReviews, reviewId]
    );
  };

  const handleUpdateDisplayOnHomepage = async () => {
    try {
      if (checkedReviews.length < 3) {
        toast.error('Минимальное количество отзывов для отображения на главной - 3');
        return;
      }

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put('/admin/reviews/update-display-on-homepage', {checkedReviews}, config);
      toast.success('Отображение отзывов на главной успешно обновлено!');
      await queryClient.invalidateQueries('approvedReviewsHomepage');
      setIsChangesMade(false);
    } catch (error) {
      console.error('Ошибка при обновлении отображения отзывов на главной странице:', error);
      toast.error('Ошибка при обновлении отображения отзывов на главной странице');
    }
  };

  return (
    <AdminLayout>
      <section className={styles.section}>
        <div className="container container--admin">
          <h1 className="admin__title">Отображение отзывов на главной</h1>
          <ReviewNavigationLinks/>
          {isLoading && <p>Загрузка отзывов...</p>}
          {isError && <p>Произошла ошибка при загрузке отзывов</p>}
          {!isLoading && !isError && (
            <>
              {approvedReviews.length === 0 ? (
                <p>Отзывов на данный момент нет</p>
              ) : (
                <>
                  <ul className={styles.list}>
                    {approvedReviews.map((review) => (
                      <ReviewItem
                        showControls={false}
                        review={review}
                        key={review.id}
                        isVisibleCheckbox={true}
                        isChecked={review.display_on_homepage}
                        onChangeCheckbox={() => handleCheckboxChange(review.id)}
                      />
                    ))}
                  </ul>
                  <button
                    className={`${styles.btn} ${isChangesMade ? styles.show : ''}`}
                    onClick={handleUpdateDisplayOnHomepage}
                  >
                    Сохранить изменения
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </AdminLayout>
  );
};