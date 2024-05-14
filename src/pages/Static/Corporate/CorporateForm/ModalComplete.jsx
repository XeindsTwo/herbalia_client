import {useModalClose} from "../../../../hooks/useModalClose.jsx";
import styles from './ModalWindow.module.scss';

export const ModalComplete = ({isOpenModal, setIsOpenModal}) => {
  const handleCloseModal = useModalClose(isOpenModal, setIsOpenModal);

  return (
    <div className={`${styles.modal} ${isOpenModal ? styles.modal_active : ''}`}>
      <button className={styles.close} onClick={handleCloseModal} type="button"/>
      <h3 className={styles.title}>Заявление успешно отправлено</h3>
      <div className={styles.content}>
        <p>
          Спасибо за отправку заявления. Ожидайте в ближайшие время ответа от нашего менеджера
        </p>
      </div>
    </div>
  );
};