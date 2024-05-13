import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios'; // импортируем Axios
import styles from './CategoryWithProducts.module.scss';
import 'swiper/css';

const fetchCategoriesWithProducts = async () => {
  try {
    const response = await axios.get('/categories-with-products'); // делаем запрос с помощью Axios
    return response.data; // возвращаем данные из ответа
  } catch (error) {
    throw new Error('Failed to fetch categories with products');
  }
};

export const CategoryWithProducts = () => {
  const { data, isLoading, isError } = useQuery('categoriesWithProducts', fetchCategoriesWithProducts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <section className="indent">
      <div className="container">
        <div className={styles.inner}>
          {data.map(category => (
            <div key={category.id} className={styles.category}>
              <h2>{category.name}</h2>
              <div className={styles.products}>
                {category.products.map(product => (
                  <div key={product.id} className={styles.product}>
                    {product.images.length > 0 && (
                      <img src={product.images[0].url} alt={product.name} className={styles.productImage}/>
                    )}
                    <h3>{product.name}</h3>
                    <p>{product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};