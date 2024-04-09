import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from './LogoutButton.module.scss';

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      await axios.post('/profile/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Ошибка при выходе из аккаунта', error);
    }
  };

  return (
    <button className={styles.logout} onClick={handleLogout}>Выйти из аккаунта</button>
  );
};