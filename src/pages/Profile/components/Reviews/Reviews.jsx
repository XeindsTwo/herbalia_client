import {ReviewItems} from "./ReviewItems/ReviewItems.jsx";
import {ReviewDeleteModal} from "../Modals/ReviewDeleteModal.jsx";
import {useState} from "react";
import {toast} from "react-toastify";

export const Reviews = ({reviews, onDeleteReview}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState(null);

  const handleOpenModal = (reviewId) => {
    setReviewIdToDelete(reviewId);
    setModalOpen(true);
    document.body.classList.add('body--active');
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    document.body.classList.remove('body--active');
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await onDeleteReview(reviewId);
      toast.success('Отзыв успешно был удалён!');
      handleCloseModal();
    } catch (error) {
      console.error('Ошибка при удалении отзыва:', error);
      toast.error('Не удалось удалить отзыв. Пожалуйста, попробуйте еще раз.');
    }
  };

  return (
    <>
      <ReviewItems
        reviews={reviews}
        onOpenModal={handleOpenModal}
        onDeleteReview={onDeleteReview}
      />
      <ReviewDeleteModal
        isOpen={modalOpen}
        onCancel={handleCloseModal}
        onDeleteReview={handleDeleteReview}
        reviewIdToDelete={reviewIdToDelete}
      />
    </>
  );
};