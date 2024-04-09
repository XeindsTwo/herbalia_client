import {useState} from 'react';
import {AdminLayout} from '../../../components/AdminLayout.jsx';
import styles from './Reviews.module.scss';
import {ReviewNavigationLinks} from './ReviewNavigationLinks/ReviewNavigationLinks.jsx';
import {ReviewItem} from './ReviewItem/ReviewItem.jsx';
import {ModalDelete} from './Modals/ModalDelete.jsx';
import {useQuery, useQueryClient} from 'react-query';
import axios from 'axios';
import {toast} from 'react-toastify';

export const ApprovedReviews = () => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const queryClient = useQueryClient();

  const {data: approvedReviews, isLoading, isError} = useQuery('approvedReviews', async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get('/admin/reviews/approved', config);
    return response.data;
  });

  const openDeleteModal = (review) => {
    setReviewToDelete(review);
    setDeleteModalIsOpen(true);
  };

  const closeModal = () => {
    setReviewToDelete(null);
    setDeleteModalIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`/admin/reviews/delete/${reviewToDelete.id}`, config);
      toast.success('Отзыв успешно удалён!');
      await queryClient.invalidateQueries('approvedReviews');
    } catch (error) {
      console.error('Ошибка при удалении отзыва:', error);
      toast.error('Ошибка при удалении отзыва');
    } finally {
      closeModal();
    }
  };

  return (
    <AdminLayout>
      <section>
        <div className="container container--admin">
          <div>
            <h1 className="admin__title">Управление одобренными отзывами</h1>
            <ReviewNavigationLinks/>
            {isLoading && <p>Загрузка отзывов...</p>}
            {isError && <p>Произошла ошибка при загрузке отзывов</p>}
            {!isLoading && !isError && (
              <>
                {approvedReviews.length === 0 ? (
                  <p>Отзывов на данный момент нет</p>
                ) : (
                  <ul className={styles.list}>
                    {approvedReviews.map((review) => (
                      <ReviewItem
                        isApproved={false}
                        review={review}
                        key={review.id}
                        handleDelete={openDeleteModal}
                      />
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </section>
      <ModalDelete
        isOpen={deleteModalIsOpen}
        setIsOpen={setDeleteModalIsOpen}
        handleDelete={handleDelete}
        reviewToDelete={reviewToDelete}
      />
    </AdminLayout>
  );
};