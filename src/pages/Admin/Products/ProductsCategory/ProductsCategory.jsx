import React, {useState} from 'react';
import {AdminLayout} from '../../../../components/AdminLayout.jsx';
import {AdminLink} from '../../components/AdminButton/AdminLink.jsx';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
import styles from './ProductsCategory.module.scss';
import EyeIcon from '../../../../assets/images/icons/product/eye.svg?react';
import EditIcon from '../../../../assets/images/icons/product/edit.svg?react';
import DeleteIcon from '../../../../assets/images/icons/product/delete.svg?react';
import {Link, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';

export const ProductsCategory = () => {
  const {categoryId} = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const {isLoading, isError, data, refetch} = useQuery(['products', categoryId], fetchProducts);

  async function fetchProducts() {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`/admin/products/category/${categoryId}`, config);
      setCategoryName(response.data.category);
      return response.data.products;
    } catch (error) {
      console.error('Произошла ошибка при получении продуктов:', error);
      throw error;
    }
  }

  const deleteProduct = useMutation(
    async (productId) => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.delete(`/admin/products/${productId}`, config);
      } catch (error) {
        console.error('Ошибка при удалении товара:', error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        toast.success('Товар успешно удален');
        refetch();
      },
      onError: () => {
        toast.error('Произошла ошибка при удалении товара');
      },
    }
  );

  const filteredProducts = data ? data.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <AdminLayout>
      <section>
        <div className="container container--admin">
          <div>
            <h1 className="admin__title">{`Управление категорией "${categoryName}"`}</h1>
            <AdminLink path={'/admin/products/create'} children={'Создать новый товар'}/>
            <input
              className={`input ${styles.search}`}
              type="text"
              placeholder={'Поиск по имени товара'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isError && <p>Произошла ошибка при загрузке товаров</p>}
            {isLoading ? (
              <p>Загрузка...</p>
            ) : (
              <>
                {filteredProducts.length === 0 ? (
                  <p>В данной категории товаров ещё не существует</p>
                ) : (
                  <ul className={styles.list}>
                    {filteredProducts.map((product) => (
                      <li key={product.id}>
                        <div className={styles.head}>
                          <div className={styles.actions}>
                            <Link
                              className={`${styles.action} ${styles.action_view}`}
                              to={`/catalog/${categoryId}/${product.id}`}
                              target="_blank"
                            >
                              <EyeIcon/>
                            </Link>
                            <Link
                              className={`${styles.action} ${styles.action_edit}`}
                              to={`/admin/products/${product.id}/edit`}
                              target="_blank"
                            >
                              <EditIcon/>
                            </Link>
                            <button
                              className={`${styles.action} ${styles.action_delete}`}
                              type="button"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    'Вы уверены, что хотите удалить этот товар? Отменить действие будет невозможно.'
                                  )
                                ) {
                                  deleteProduct.mutate(product.id);
                                }
                              }}
                            >
                              <DeleteIcon/>
                            </button>
                          </div>
                          {product.images.length > 0 && (
                            <img
                              className={styles.img}
                              src={product.images[0].url}
                              alt={product.name}
                              height={350}
                            />
                          )}
                        </div>
                        <p className={styles.price}>Цена: {product.price} ₽</p>
                        <h3 className={styles.title}>{product.name}</h3>
                        <p className={styles.article}>Артикул - {product.article}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};