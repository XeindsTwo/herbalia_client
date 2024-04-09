import {Layout} from "../../../components/Layout.jsx";
import {Breadcrumbs} from "../../../components/Breadcrumbs/Breadcrumbs.jsx";
import styles from './Forms.module.scss';
import {NameInput} from "../../../components/FormFields/NameInput.jsx";
import {EmailInput} from "../../../components/FormFields/EmailInput.jsx";
import {useEffect, useState} from "react";
import {validateEmail, validateName, validateSuggestionComment} from "../../../utils/validationUtils.js";
import axios from "axios";
import {toast} from 'react-toastify';

export const ImprovementForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [suggestionError, setSuggestionError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleSuggestionChange = (e) => setSuggestion(e.target.value);

  const handleNameBlur = () => {
    const error = validateName(name);
    setNameError(error);
  };

  const handleEmailBlur = () => {
    const error = validateEmail(email);
    setEmailError(error);
  };

  const handleSuggestionBlur = () => {
    const error = validateSuggestionComment(suggestion);
    setSuggestionError(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameValidationResult = validateName(name);
    const emailValidationResult = validateEmail(email);
    const suggestionValidationResult = validateSuggestionComment(suggestion);

    setNameError(nameValidationResult);
    setEmailError(emailValidationResult);
    setSuggestionError(suggestionValidationResult);

    if (!nameValidationResult && !emailValidationResult && !suggestionValidationResult) {
      const formData = {
        name: name,
        email: email,
        suggestion_comment: suggestion,
      };

      try {
        const response = await axios.post('/improvements-form', formData);

        if (response.status === 201) {
          toast.success('Успех! Предложение успешно отправлено, ожидайте ответа на почту', {});
          setName('');
          setEmail('');
          setSuggestion('');
        }
      } catch (error) {
        if (error.response && error.response.status === 429) {
          toast.error('Превышено максимальное количество запросов. Пожалуйста, попробуйте позже', {});
        } else {
          console.log(error);
          toast.error('Ошибка при отправке формы. Пожалуйста, попробуйте позже');
        }
      }
    }
  };

  useEffect(() => {
    setIsFormValid(!nameError && !emailError && !suggestionError);
  }, [nameError, emailError, suggestionError]);

  return (
    <Layout>
      <section className={'indent indent--breadcrumbs indent--footer'}>
        <div className="container">
          <Breadcrumbs
            current={'Предложить улучшение'}
            additional={[{label: 'Отзывы', to: '/reviews/'}]}
          />
          <h1 className={`${styles.title} title`}>Предложить улучшение</h1>
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
              <label className="label" htmlFor="comment">Ваше предложение:</label>
              <span className="error" style={{display: suggestionError ? 'block' : 'none'}}>{suggestionError}</span>
              <textarea className="input input--textarea"
                        id="suggestion_comment" name="suggestion_comment"
                        value={suggestion}
                        onChange={handleSuggestionChange}
                        onBlur={handleSuggestionBlur}
                        placeholder={"Ваше предложение"}
              />
            </div>
            <button className={styles.submit} disabled={!isFormValid} type="submit">Отправить</button>
          </form>
        </div>
      </section>
    </Layout>
  );
}