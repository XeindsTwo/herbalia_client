import {useModalClose} from '../../../../hooks/useModalClose';
import styles from '../../../../components/ModalWindows/ModalWindow.module.scss';

export const ModalApprove = ({isOpen, setIsOpen, handleApprove, review}) => {
  const handleCloseModal = useModalClose(isOpen, setIsOpen);

  return (
    <div className={`${styles.modal} ${isOpen && styles.modal_active}`}>
      <button className={styles.close} onClick={handleCloseModal} type="button"></button>
      <h3 className={styles.title}>Одобрение отзыва</h3>
      <p className={styles.text}>
        Вы действительно хотите одобрить отзыв от пользователя <span>{review?.name}</span>?
        Действие отменить будет невозможно
      </p>
      <div className={styles.buttons}>
        <button className={styles.btn} onClick={handleCloseModal} type="button">
          Отменить
        </button>
        <button className={`${styles.btn} ${styles.btn_confirm}`} onClick={handleApprove} type="button">
          Да, одобрить
        </button>
      </div>
    </div>
  );
};