import {useState} from 'react';
import {AdminLayout} from '../../../components/AdminLayout.jsx';
import styles from './Reviews.module.scss';
import {ReviewNavigationLinks} from './ReviewNavigationLinks/ReviewNavigationLinks.jsx';
import {ReviewItem} from './ReviewItem/ReviewItem.jsx';
import {ModalDelete} from './Modals/ModalDelete.jsx';
import {useQuery, useQueryClient} from 'react-query';
import axios from 'axios';
import {toast} from 'react-toastify';
import {ModalApprove} from "./Modals/ModalApprove.jsx";

export const UnapprovedReviews = () => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [approveModalIsOpen, setApproveModalIsOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  const queryClient = useQueryClient();

  const {data: unapprovedReviews, isLoading, isError} = useQuery('unapprovedReviews', async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get('/admin/reviews', config);
    return response.data;
  });

  const openDeleteModal = (review) => {
    setReviewToDelete(review);
    setDeleteModalIsOpen(true);
  };

  const openApproveModal = (review) => {
    setSelectedReview(review);
    setApproveModalIsOpen(true);
  };

  const closeModal = () => {
    setReviewToDelete(null);
    setSelectedReview(null);
    setDeleteModalIsOpen(false);
    setApproveModalIsOpen(false);
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
      await queryClient.invalidateQueries('unapprovedReviews');
    } catch (error) {
      console.error('Ошибка при удалении отзыва:', error);
      toast.error('Ошибка при удалении отзыва');
    } finally {
      closeModal();
    }
  };

  const handleApprove = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`/admin/reviews/approve/${selectedReview.id}`, {}, config);
      toast.success('Отзыв успешно одобрен!');
      await queryClient.invalidateQueries('unapprovedReviews');
    } catch (error) {
      console.error('Ошибка при одобрении отзыва:', error);
      toast.error('Ошибка при одобрении отзыва');
    } finally {
      closeModal();
    }
  };

  return (
    <AdminLayout>
      <section>
        <div className="container container--admin">
          <div>
            <h1 className="admin__title">Управление не одобренными отзывами</h1>
            <ReviewNavigationLinks/>
            {isLoading && <p>Загрузка отзывов...</p>}
            {isError && <p>Произошла ошибка при загрузке отзывов</p>}
            {!isLoading && !isError && (
              <>
                {unapprovedReviews.length === 0 ? (
                  <p>Отзывов на данный момент нет</p>
                ) : (
                  <ul className={styles.list}>
                    {unapprovedReviews.map((review) => (
                      <ReviewItem
                        review={review}
                        key={review.id}
                        handleDelete={openDeleteModal}
                        handleApprove={openApproveModal}
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
      <ModalApprove
        isOpen={approveModalIsOpen}
        setIsOpen={setApproveModalIsOpen}
        handleApprove={handleApprove}
        review={selectedReview}
      />
    </AdminLayout>
  );
};