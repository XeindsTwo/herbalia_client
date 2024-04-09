import {useEffect, useState} from "react";
import axios from "axios";
import {Layout} from "../../components/Layout.jsx";
import {Link, useNavigate} from "react-router-dom";
import styles from './Auth.module.scss';
import logo from "../../assets/images/icons/auth-logo.svg";
import ArrowBackIcon from '../../assets/images/icons/arrow-back.svg?react';
import {LoginInput} from "../../components/FormFields/LoginInput.jsx";
import {NameInput} from "../../components/FormFields/NameInput.jsx";
import {EmailInput} from "../../components/FormFields/EmailInput.jsx";
import {PasswordInput} from "../../components/FormFields/PasswordInput.jsx";
import {validateEmail, validateLogin, validateName, validatePassword} from "../../utils/validationUtils.js";

export const Registration = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLoginChange = (e) => setLogin(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLoginBlur = () => {
    const error = validateLogin(login);
    setLoginError(error);
  };

  const handleNameBlur = () => {
    const error = validateName(name);
    setNameError(error);
  };

  const handleEmailBlur = () => {
    const error = validateEmail(email);
    setEmailError(error);
  };

  const handlePasswordBlur = () => {
    const error = validatePassword(password);
    setPasswordError(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginValidationResult = validateLogin(login);
    const nameValidationResult = validateName(name);
    const emailValidationResult = validateEmail(email);
    const passwordValidationResult = validatePassword(password);

    setLoginError(loginValidationResult);
    setNameError(nameValidationResult);
    setEmailError(emailValidationResult);
    setPasswordError(passwordValidationResult);

    if (!loginValidationResult && !nameValidationResult && !emailValidationResult && !passwordValidationResult) {
      try {
        const loginResponse = await axios.post("/check-login", {login});
        const emailResponse = await axios.post("/check-email", {email});

        if (!loginResponse.data.exists && !emailResponse.data.exists) {
          console.log("Логин и email уникальны. Отправка формы...");
          const formData = {login, name, email, password};
          console.log("Отправка формы с данными:", formData);

          const registrationResponse = await axios.post("/register", formData);
          console.log("Регистрация прошла успешно:", registrationResponse.data);
          navigate("/login");
        } else {
          if (loginResponse.data.exists) {
            setLoginError("Этот логин уже занят");
            setTimeout(() => {
              setLoginError("");
            }, 2500);
          }
          if (emailResponse.data.exists) {
            setEmailError("Этот email уже занят");
            setTimeout(() => {
              setEmailError("");
            }, 2500);
          }
        }
      } catch (error) {
        console.error("Ошибка при регистрации:", error);
      }
    } else {
      console.log("Форма содержит ошибки. Невозможно отправить данные.");
    }
  };

  return (
    <Layout showHeader={false} showFooter={false}>
      <section className={styles.auth}>
        <div className="container">
          <div className={styles.content}>
            <Link className={`${styles.logo} logo`} to={"/"}>
              <img className="logo" width="226" height="52" src={logo} alt="логотип"/>
            </Link>
            <Link className={styles.back} to={"/"}>
              <ArrowBackIcon/>
              Вернуться на главную
            </Link>
            <h2 className={styles.title}>Регистрация профиля</h2>
            <form onSubmit={handleSubmit}>
              <ul className={styles.list}>
                <li>
                  <LoginInput
                    value={login}
                    onChange={handleLoginChange}
                    onBlur={handleLoginBlur}
                    error={loginError}
                    showError={true}
                  />
                </li>
                <li>
                  <NameInput
                    value={name}
                    onChange={handleNameChange}
                    onBlur={handleNameBlur}
                    error={nameError}
                  />
                </li>
                <li>
                  <EmailInput
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    error={emailError}
                  />
                </li>
                <li>
                  <PasswordInput
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    error={passwordError}
                    showError={true}
                  />
                </li>
              </ul>
              <label className={`${styles.accept}`}>
                Регистрируя аккаунт, вы автоматически соглашаетесь с
                <Link to={"/agreement/"}>пользовательским соглашением</Link>
              </label>
              <span className={styles.link}>
                Есть аккаунт? <Link to="/login/">Войти</Link>
              </span>
              <button className={styles.btn} type="submit">Зарегистрироваться</button>
            </form>
          </div>
          <div className={styles.decor}/>
        </div>
      </section>
    </Layout>
  );
}