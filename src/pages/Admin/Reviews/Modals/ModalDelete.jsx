import {useModalClose} from '../../../../hooks/useModalClose';
import styles from '../../../../components/ModalWindows/ModalWindow.module.scss';

export const ModalDelete = ({isOpen, setIsOpen, handleDelete, reviewToDelete}) => {
  const handleCloseModal = useModalClose(isOpen, setIsOpen);

  return (
    <div className={`${styles.modal} ${isOpen ? styles.modal_active : ''}`}>
      <button className={styles.close} onClick={handleCloseModal} type="button"></button>
      <h3 className={styles.title}>Удаление отзыва</h3>
      <p className={styles.text}>
        Вы действительно хотите удалить отзыв от пользователя <span>{reviewToDelete?.name}</span>?
        Удаление отменить будет невозможно
      </p>
      <div className={styles.buttons}>
        <button className={styles.btn} onClick={handleCloseModal} type="button">
          Отменить
        </button>
        <button className={`${styles.btn} ${styles.btn_confirm}`} onClick={handleDelete} type="button">
          Да, удалить
        </button>
      </div>
    </div>
  );
};