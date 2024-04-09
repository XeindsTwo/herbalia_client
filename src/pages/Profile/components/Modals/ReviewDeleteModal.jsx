import styles from "../../../../components/ModalWindows/ModalWindow.module.scss";

export const ReviewDeleteModal = ({isOpen, onCancel, onDeleteReview, reviewIdToDelete}) => {
  const handleConfirmDelete = () => {
    onDeleteReview(reviewIdToDelete);
  };

  return (
    <div className={`${styles.modal} ${isOpen ? styles.modal_active : ''}`}>
      <button className={styles.close} onClick={onCancel} type="button"/>
      <h3 className={styles.title}>Удаление отзыва</h3>
      <p className={styles.text}>
        Вы действительно хотите удалить свой отзыв? Данный отзыв удалится в системе полностью.
        Отменить действие будет невозможно
      </p>
      <div className={styles.buttons}>
        <button
          className={styles.btn}
          onClick={onCancel}
          type="button"
        >
          Отменить
        </button>
        <button
          className={`${styles.btn} ${styles.btn_confirm}`}
          onClick={handleConfirmDelete}
          type="button"
        >
          Да, удалить
        </button>
      </div>
    </div>
  );
};