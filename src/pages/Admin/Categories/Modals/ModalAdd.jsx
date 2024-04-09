import {useEffect, useState} from "react";
import styles from "../../../../components/ModalWindows/ModalWindow.module.scss";
import {NameInput} from "../../../../components/FormFields/Category/NameInput.jsx";
import {SubtitleInput} from "../../../../components/FormFields/Category/SubtitleInput.jsx";
import {validateCategoryName, validateCategorySubtitle} from "../../../../utils/validationUtils.js";
import axios from 'axios';
import {toast} from "react-toastify";
import {useModalClose} from "../../../../hooks/useModalClose.jsx";

export const ModalAdd = ({isOpen, setIsOpen, addCategory}) => {
  const handleCloseModal = useModalClose(isOpen, setIsOpen);

  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [nameError, setNameError] = useState('');
  const [subtitleError, setSubtitleError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleSubtitleChange = (e) => setSubtitle(e.target.value);

  const handleNameBlur = () => {
    const error = validateCategoryName(name);
    setNameError(error);
  };

  const handleSubtitleBlur = () => {
    const error = validateCategorySubtitle(subtitle);
    setSubtitleError(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameValidationResult = validateCategoryName(name);
    const subtitleValidationResult = validateCategorySubtitle(subtitle);

    setNameError(nameValidationResult);
    setSubtitleError(subtitleValidationResult);

    if (!nameValidationResult && !subtitleValidationResult) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.post('/admin/categories', {
          name: name,
          subtitle: subtitle,
        }, config);

        toast.success('Категория была успешно создана!');
        setIsOpen(false);
        setName('');
        setSubtitle('');
        addCategory(response.data.category);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setNameError('Категория с таким именем уже существует');
        } else {
          toast.error('Ошибка при создании категории. Пожалуйста, попробуйте позже');
          console.error('Ошибка при создании категории', error);
        }
      }
    }
  };

  useEffect(() => {
    setIsFormValid(!nameError && !subtitleError);
  }, [nameError, subtitleError]);

  return (
    <div className={`${styles.modal} ${isOpen ? styles.modal_active : ''}`}>
      <button className={styles.close} onClick={handleCloseModal} type={"button"}/>
      <h3 className={styles.title}>Создание категории</h3>
      <form onSubmit={handleSubmit}>
        <ul className={styles.list}>
          <li>
            <NameInput
              value={name}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              error={nameError}
            />
          </li>
          <li>
            <SubtitleInput
              value={subtitle}
              onChange={handleSubtitleChange}
              onBlur={handleSubtitleBlur}
              error={subtitleError}
            />
          </li>
        </ul>
        <button
          className={`${styles.btn}`}
          disabled={!isFormValid}
          type="submit"
        >
          Создать категорию
        </button>
      </form>
    </div>
  )
};