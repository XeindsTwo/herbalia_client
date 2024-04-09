import {useState, useEffect} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import styles from '../../../../components/ModalWindows/ModalWindow.module.scss';
import {EmailInput} from "../../../../components/FormFields/EmailInput.jsx";
import {validateEmail} from "../../../../utils/validationUtils.js";

export const EmailEditModal = ({isModalOpen, closeModal, initialEmail, onEmailUpdate}) => {
  const [editedEmail, setEditedEmail] = useState(initialEmail);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    setEditedEmail(initialEmail);
  }, [initialEmail]);

  const handleChange = (e) => {
    const newEmail = e.target.value;
    setEditedEmail(newEmail);
    const error = validateEmail(newEmail);
    setEmailError(error);
  };

  const isEmailChanged = editedEmail !== initialEmail;

  const handleSave = async () => {
    if (emailError || !isEmailChanged) {
      return;
    }

    try {
      await axios.put('/profile/update-email', {
        email: editedEmail
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      onEmailUpdate(editedEmail);
      closeModal();
      setTimeout(() => {
        toast.success('Почта успешно обновлена');
      }, 300);
    } catch (error) {
      if (error.response) {
        if (error.response.data.error) {
          setEmailError(error.response.data.error);
        } else {
          toast.error('Ошибка при обновлении данных. Пожалуйста, попробуйте позже');
          console.log(error);
        }
      } else {
        toast.error('Ошибка при отправке формы. Пожалуйста, попробуйте позже');
        console.log(error);
      }
    }
  };

  return (
    <div className={`${styles.modal} ${isModalOpen ? styles.modal_active : ''}`}>
      <button className={styles.close} onClick={closeModal} type={"button"}/>
      <h3 className={styles.title}>Редактирование почты</h3>
      <form action="">
        <div className={styles.list}>
          <div>
            <EmailInput
              value={editedEmail}
              onChange={handleChange}
              label={false}
              error={emailError}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.btn}
            onClick={closeModal}
            type={"button"}
          >
            Отменить
          </button>
          <button
            className={`${styles.btn} ${styles.btn_confirm}`}
            onClick={handleSave}
            disabled={emailError || !isEmailChanged}
            type={"button"}
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};