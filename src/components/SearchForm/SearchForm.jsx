import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchForm.module.scss';

export const SearchForm = ({ isActive, setIsActive }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const formRef = useRef(null);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/search', { state: { query } });
    closeForm();
  };

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeForm();
    }
  };

  const handleClickOutside = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      closeForm();
    }
  };

  const closeForm = () => {
    setIsActive(false);
    setQuery('');
  };

  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      inputRef.current.focus(); // Устанавливаем фокус на поле ввода при открытии формы
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive]);

  return (
    <form ref={formRef} className={`${styles.form} ${isActive ? styles.active : ''}`} onSubmit={handleSubmit}>
      <button className={styles.close} type="button" onClick={closeForm} />
      <div className={styles.content}>
        <span className={styles.subtext}>Поиск цветов</span>
        <div className={styles.search}>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder="Поиск"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <button className={styles.btn} type="submit">Найти</button>
        </div>
      </div>
    </form>
  );
};