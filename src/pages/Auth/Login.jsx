import {Layout} from "../../components/Layout.jsx";
import styles from './Auth.module.scss';
import {Link, useNavigate} from "react-router-dom";
import logo from '../../assets/images/icons/auth-logo.svg';
import ArrowBackIcon from '../../assets/images/icons/arrow-back.svg?react';
import {useEffect, useState} from "react";
import axios from "axios";
import {PasswordInput} from "../../components/FormFields/PasswordInput.jsx";
import {LoginInput} from "../../components/FormFields/LoginInput.jsx";
import {useTimeoutError} from "../../hooks/useTimeoutError.jsx";

export const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  useTimeoutError(() => {
    setFormError('');
  }, formError ? 2500 : null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!login || !password) {
        setFormError('Пожалуйста, заполните все поля');
        return;
      }

      const response = await axios.post('/login', {
        login,
        password
      });

      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setFormError('Неверно введен логин или пароль');
      } else {
        setFormError('Ошибка при отправке запроса');
      }
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
            <h2 className={styles.title}>Вход в профиль</h2>
            <p className={styles.text}>Вы увидите историю заказов, будете иметь возможность оставлять отзывы и т.д.</p>
            <form onSubmit={handleSubmit}>
              <span className='error' style={{display: formError ? "block" : 'none'}}>{formError}</span>
              <ul className={styles.list}>
                <li>
                  <LoginInput
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    autocomplete={true}
                  />
                </li>
                <li>
                  <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autocomplete={true}
                  />
                </li>
              </ul>
              <span className={styles.link}>
                Нет аккаунта? <Link to="/register/">Тогда зарегистрируйтесь</Link>
              </span>
              <button className={styles.btn} type="submit">Войти</button>
            </form>
          </div>
          <div className={styles.decor}/>
        </div>
      </section>
    </Layout>
  );
};