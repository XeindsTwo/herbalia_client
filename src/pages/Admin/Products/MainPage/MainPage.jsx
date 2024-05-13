import {AdminLink} from "./../../components/AdminButton/AdminLink.jsx";
import {AdminLayout} from "../../../../components/AdminLayout.jsx";
import {useQuery} from 'react-query';
import axios from 'axios';
import styles from './MainPage.module.scss';
import {Link} from "react-router-dom";

export const MainPage = () => {
  const {isLoading, isError, data} = useQuery('categories', fetchCategories);

  async function fetchCategories() {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get('/admin/categories', config);
      console.log(response);
      return response;
    } catch (error) {
      throw new Error('Произошла ошибка при загрузке категорий товаров');
    }
  }

  return (
    <AdminLayout>
      <section>
        <div className="container container--admin">
          <div>
            <h1 className="admin__title admin__title--bottom">Управление товарами</h1>
            {isError && <p>Произошла ошибка при загрузке категорий товаров</p>}
            {isLoading ? (
              <p>Загрузка...</p>
            ) : (
              <>
                {data && data.data && data.data.length === 0 ? (
                  <div>На данный момент категорий нет в системе</div>
                ) : (
                  <>
                    <p className={styles.info}>Чтобы работать с товарами, выберите категорию</p>
                    <ul className={styles.list}>
                      {data && data.data && data.data.map(category => (
                        <li key={category.id}>
                          <Link className={styles.item} to={`/admin/products/category/${category.id}`}>
                            <span className={styles.title}>{category.name}</span>
                            <p className={styles.subtitle}>{category.subtitle}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </AdminLayout>
  )
}