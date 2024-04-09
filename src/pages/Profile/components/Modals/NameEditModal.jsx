import {useState, useEffect} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import styles from '../../../../components/ModalWindows/ModalWindow.module.scss';
import {NameInput} from "../../../../components/FormFields/NameInput.jsx";
import {validateName} from "../../../../utils/validationUtils.js";

export const NameEditModal = ({isModalOpen, closeModal, initialName, onNameUpdate}) => {
  const [editedName, setEditedName] = useState(initialName);
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    setEditedName(initialName);
  }, [initialName]);

  const handleChange = (e) => {
    const newName = e.target.value;
    setEditedName(newName);
    const error = validateName(newName);
    setNameError(error);
  };

  const isNameChanged = editedName !== initialName;

  const handleSave = async () => {
    if (nameError || !isNameChanged) {
      return;
    }

    try {
      await axios.put('/profile/update-name', {
        name: editedName
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      onNameUpdate(editedName);
      closeModal();
      setTimeout(() => {
        toast.success('Имя успешно обновлено');
      }, 300);
    } catch (error) {
      toast.error('Ошибка при отправке формы. Пожалуйста, попробуйте позже');
      console.log(error);
    }
  };

  return (
    <div className={`${styles.modal} ${isModalOpen ? styles.modal_active : ''}`}>
      <button className={styles.close} onClick={closeModal} type={"button"}/>
      <h3 className={styles.title}>Редактирование имени</h3>
      <form action="">
        <div className={styles.list}>
          <div>
            <NameInput
              value={editedName}
              onChange={handleChange}
              label={false}
              error={nameError}
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
            disabled={nameError || !isNameChanged}
            type={"button"}
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};