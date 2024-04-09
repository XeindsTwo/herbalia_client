import styles from '../../../components/ModalWindows/ModalWindow.module.scss';
import {useModalClose} from "../../../hooks/useModalClose.jsx";

export const DeleteImprovement = ({isOpen, setIsOpen, onDelete, name}) => {
  const handleCloseModal = useModalClose(isOpen, setIsOpen);

  return (
    <div className={`${styles.modal} ${isOpen ? styles.modal_active : ''}`}>
      <button className={styles.close} onClick={handleCloseModal} type={"button"}/>
      <h3 className={styles.title}>Удаление предложения</h3>
      <p className={styles.text}>
        Вы действительно хотите удалить предложение от <span>{name}</span>?
        Удаление отменить будет невозможно
      </p>
      <div className={styles.buttons}>
        <button
          className={styles.btn}
          onClick={handleCloseModal}
          type={"submit"}
        >
          Отменить
        </button>
        <button
          className={`${styles.btn} ${styles.btn_confirm}`}
          onClick={onDelete}
          type={"submit"}
        >
          Да, удалить
        </button>
      </div>
    </div>
  );
}