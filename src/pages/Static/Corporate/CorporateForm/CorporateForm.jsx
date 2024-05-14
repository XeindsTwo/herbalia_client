import {useState, useEffect} from "react";
import styles from './CorporateForm.module.scss';
import {NameInput} from "../../../../components/FormFields/NameInput.jsx";
import {PhoneInput} from "../../../../components/FormFields/PhoneInput.jsx";
import {EmailInput} from "../../../../components/FormFields/EmailInput.jsx";
import {NameCompany} from "../../../../components/FormFields/NameCompany.jsx";
import {Link} from "react-router-dom";
import {ModalComplete} from "./ModalComplete.jsx";
import axios from 'axios';
import {toast} from 'react-toastify';

export const CorporateForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    company: ''
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    const errorTimeouts = {};

    Object.keys(errors).forEach((field) => {
      if (errors[field]) {
        errorTimeouts[field] = setTimeout(() => {
          setErrors((prevState) => ({...prevState, [field]: ''}));
        }, 2000);
      }
    });

    return () => {
      Object.values(errorTimeouts).forEach(clearTimeout);
    };
  }, [errors]);

  const validateField = (name, value) => {
    let error = '';
    if (!value) {
      error = 'Пожалуйста, введите данные';
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Некорректный email';
    }
    return error;
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    const error = validateField(name, value);

    setFormData((prevState) => ({...prevState, [name]: value}));
    setErrors((prevState) => ({...prevState, [name]: error}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    let hasErrors = false;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        hasErrors = true;
      }
      newErrors[key] = error;
    });

    setErrors(newErrors);

    if (!hasErrors) {
      try {
        await axios.post('/corporate', formData);
        setIsFormSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          company: ''
        });
      } catch (error) {
        console.error('Error:', error.response.data);
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <section className={`${styles.section} indent`}>
      <div className="container">
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={`${styles.title} title`}>Отправить заявку</h2>
          <ul className={styles.list}>
            <li>
              <NameInput
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                label={true}
              />
            </li>
            <li>
              <PhoneInput
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                label={true}
              />
            </li>
            <li>
              <EmailInput
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                label={true}
              />
            </li>
            <li>
              <NameCompany
                value={formData.company}
                onChange={handleChange}
                error={errors.company}
                label={true}
              />
            </li>
          </ul>
          <button className={styles.submit} type="submit">Отправить заявку</button>
          <p className={styles.link}>
            Нажимая кнопку «Отправить», я соглашаюсь с <Link to="/agreement">Политикой публикации отзывов</Link>
          </p>
        </form>
      </div>
      <ModalComplete isOpenModal={isFormSubmitted} setIsOpenModal={setIsFormSubmitted}/>
    </section>
  );
};