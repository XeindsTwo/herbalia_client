import {AdminLayout} from "../../../../components/AdminLayout.jsx";
import {AdminLink} from "../../components/AdminButton/AdminLink.jsx";
import {useQuery, useMutation} from 'react-query';
import axios from 'axios';
import styles from './MainProducts.module.scss';
import EyeIcon from '../../../../assets/images/icons/product/eye.svg?react';
import DeleteIcon from '../../../../assets/images/icons/product/delete.svg?react';
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

export const MainProducts = () => {
  const {isLoading, isError, data, refetch} = useQuery('products', fetchProducts);

  const deleteProduct = useMutation(
    async (productId) => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      await axios.delete(`/admin/products/${productId}`, config);
    },
    {
      onSuccess: () => {
        toast.success('Товар успешно удален');
        refetch();
      },
      onError: (error) => {
        toast.error('Произошла ошибка при удалении товара');
        console.error('Ошибка при удалении товара:', error);
      }
    }
  );

  async function fetchProducts() {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.get('/admin/products', config);
    return response.data.products;
  }

  return (
    <AdminLayout>
      <section>
        <div className="container container--admin">
          <div>
            <h1 className="admin__title">Управление товарами</h1>
            <AdminLink path={'/admin/products/create'} children={'Создать новый товар'}/>
            {isError && <p>Произошла ошибка при загрузке товаров</p>}
            {isLoading ? (
              <p>Загрузка...</p>
            ) : (
              <>
                {data.length === 0 ? (
                  <div>На данный момент товаров нет в системе</div>
                ) : (
                  <ul className={styles.list}>
                    {data.map(product => (
                      <li key={product.id}>
                        <div className={styles.head}>
                          <div className={styles.actions}>
                            <Link
                              className={`${styles.action} ${styles.action_view}`}
                              to={`/catalog/${product.id}`} target="_blank"
                            >
                              <EyeIcon/>
                            </Link>
                            <button
                              className={`${styles.action} ${styles.action_delete}`}
                              type="button"
                              onClick={() => {
                                if (window.confirm('Вы уверены, что хотите удалить этот товар Отменить действие будет невозможно?')) {
                                  deleteProduct.mutate(product.id);
                                }
                              }}
                            >
                              <DeleteIcon/>
                            </button>
                          </div>
                          {product.images.length > 0 && (
                            <img src={product.images[0].url} alt={product.name}/>
                          )}
                        </div>
                        <p className={styles.price}>
                          Цена: {product.price} ₽
                        </p>
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
  )
}