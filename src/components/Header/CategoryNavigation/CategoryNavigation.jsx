import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './CategoryNavigation.module.scss';
import { Link } from 'react-router-dom';

export const CategoryNavigation = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories');
        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return <div className={styles.bottom}>Загрузка категорий...</div>;
  }

  if (isError) {
    return <div className={styles.bottom}>Ошибка при загрузке категорий</div>;
  }

  return (
    <div className={styles.bottom}>
      <ul className={styles.list}>
        {categories.map(category => (
          <li key={category.id}>
            <Link className={styles.link} to={`/catalog/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};