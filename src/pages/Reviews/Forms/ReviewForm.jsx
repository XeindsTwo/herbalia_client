import {Layout} from "../../../components/Layout.jsx";
import {Breadcrumbs} from "../../../components/Breadcrumbs/Breadcrumbs.jsx";
import styles from './Forms.module.scss';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {validateName, validateEmail, validateComment} from "../../../utils/validationUtils.js";
import {NameInput} from "../../../components/FormFields/NameInput.jsx";
import {EmailInput} from "../../../components/FormFields/EmailInput.jsx";
import {StarRating} from "../../../components/FormFields/StarRating.jsx";
import axios from "axios";
import {toast} from "react-toastify";

export const ReviewForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [commentError, setCommentError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCommentChange = (e) => setComment(e.target.value);

  const handleNameBlur = () => {
    const error = validateName(name);
    setNameError(error);
  };

  const handleEmailBlur = () => {
    const error = validateEmail(email);
    setEmailError(error);
  };

  const handleCommentBlur = () => {
    const error = validateComment(comment);
    setCommentError(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameValidationResult = validateName(name);
    const emailValidationResult = validateEmail(email);
    const commentValidationResult = validateComment(comment);

    setNameError(nameValidationResult);
    setEmailError(emailValidationResult);
    setCommentError(commentValidationResult);

    if (!nameValidationResult && !emailValidationResult && !commentValidationResult) {
      const formData = {
        name: name,
        email: email,
        comment: comment,
        rating: rating
      };

      console.log('Форма будет отправлена с данными:', formData);
      try {
        const token = localStorage.getItem('token');
        await axios.post('/reviews-form', formData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        toast.success('Поздравляем, ваш отзыв был успешно отправлен! Ожидайте ответа на почту');
        setName('');
        setEmail('');
        setComment('');
        setRating(5);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          toast.error('Превышено максимальное количество запросов. Пожалуйста, попробуйте позже');
        } else {
          toast.error('Ошибка при отправке отзыва. Пожалуйста, попробуйте позже');
        }
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setIsFormValid(!nameError && !emailError && !commentError);
  }, [nameError, emailError, commentError]);

  return (
    <Layout>
      <section className={'indent indent--breadcrumbs indent--footer'}>
        <div className="container">
          <Breadcrumbs
            current={'Написать отзыв'}
            additional={[{label: 'Отзывы', to: '/reviews/'}]}
          />
          <h1 className={`${styles.title} title`}>Написать отзыв</h1>
          <form className={styles.form} onSubmit={handleSubmit} method="POST">
            <div className={styles.items}>
              <div>
                <NameInput
                  value={name}
                  onChange={handleNameChange}
                  onBlur={handleNameBlur}
                  error={nameError}
                />
              </div>
              <div>
                <EmailInput
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  error={emailError}
                />
              </div>
            </div>
            <div>
              <label className="label" htmlFor="rating">Вы остались довольны сервисом?</label>
              <StarRating rating={rating} onChange={setRating}/>
            </div>
            <div>
              <label className="label" htmlFor="comment">Ваш отзыв:</label>
              <span className="error" style={{display: commentError ? 'block' : 'none'}}>{commentError}</span>
              <textarea className="input input--textarea"
                        id="comment" name="comment"
                        value={comment}
                        onChange={handleCommentChange}
                        onBlur={handleCommentBlur}
                        placeholder={"Ваш отзыв"}
              />
            </div>
            <div className={styles.accept}>
              <button className={styles.submit} type="submit" disabled={!isFormValid}>Отправить</button>
              <p className={styles.link}>
                Нажимая кнопку «Отправить», я соглашаюсь с <Link to="/agreement">Политикой публикации отзывов</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}