import {useModalClose} from "../../hooks/useModalClose.jsx";
import styles from './ModalWindow.module.scss';

export const Modal = ({isOpenModal, setIsOpenModal}) => {
  const handleCloseModal = useModalClose(isOpenModal, setIsOpenModal);

  return (
    <div className={`${styles.modal} ${styles.modal_reviews} ${isOpenModal ? styles.modal_active : ''}`}>
      <button className={styles.close} onClick={handleCloseModal} type="button"/>
      <h3 className={styles.title}>Правила публикации отзывов</h3>
      <div className={styles.content}>
        <p>
          Мы всегда рады вашим отзывам и предложениям по улучшению.
          <br/>
          Вместе мы делаем отличный, удобный и надёжный сервис для Всех!
        </p>
        <p>
          Ниже мы хотели бы отметить основные правила публикации отзывов:
          <br/>
          1. Отзывы от наших клиентов (дарителей и получателей);
          <br/>
          2. Объективные плюсы и минусы;
          <br/>
          3. По выполненным заказам;
        </p>
        <p>
          Если у вас рекламация, то мы рассчитываем на объективность с обоих сторон.
        </p>
        <p>
          Помните, что лучше сразу написать нам или позвонить.
          <br/>
          И мы оперативно решим любую возникшую проблему.
        </p>
      </div>
    </div>
  );
};