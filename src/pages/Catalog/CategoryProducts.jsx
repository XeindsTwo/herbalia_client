import {useState, useEffect} from 'react';
import axios from 'axios';
import {Layout} from '../../components/Layout.jsx';
import {useParams, Link} from 'react-router-dom';
import {Breadcrumbs} from '../../components/Breadcrumbs/Breadcrumbs.jsx';
import {formatPrice} from '../../utils/priceUtils.js';
import vase from '../../assets/images/icons/vase.svg';
import styles from './CategoryProducts.module.scss';
import Skeleton from 'react-loading-skeleton';
import HeartIcon from '../../assets/images/icons/heart.svg?react';
import 'react-loading-skeleton/dist/skeleton.css';
import {Favorites} from "../../components/Favorites/Favorites.jsx";

export const CategoryProducts = () => {
  const {favorites, handleToggleFavorite} = Favorites();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [totalCount, setTotalCount] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const {categoryId} = useParams();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const categoryIdNumber = parseInt(categoryId, 10);
        const response = await axios.get(`/catalog/${categoryIdNumber}`);
        setCategoryName(response.data.category_name);
        setMinPrice(response.data.min_price);
        setTotalCount(response.data.total_count);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);

  return (
    <Layout>
      <section className={'indent--breadcrumbs'}>
        <div className="container">
          <Breadcrumbs
            current={categoryName}
            additional={[{label: 'Каталог', to: '/catalog'}]}
          />
          <div className={styles.top}>
            <h1 className={styles.name}>{categoryName}</h1>
            {!isLoading && !isError && products.length > 0 && (
              <div className={styles.counters}>
                <span>от {formatPrice(minPrice)}</span>
                <span>{totalCount} шт</span>
              </div>
            )}
          </div>
          {isLoading ? (
            <ul className={styles.list}>
              {[...Array(4)].map((_, index) => (
                <li key={index}>
                  <Skeleton height={300}/>
                  <Skeleton count={4}/>
                </li>
              ))}
            </ul>
          ) : (
            <>
              {isError && <div>Ошибка при загрузке товаров</div>}
              {products.length === 0 && !isError && (
                <div className={styles.empty}>
                  <img src={vase} alt="Ваза декор" width={70} height={88}/>
                  <span className={styles.empty_top}>В разделе пока пусто</span>
                  <p>В скором времени здесь появятся товары :)</p>
                </div>
              )}
              {products.length > 0 && (
                <ul className={styles.list}>
                  {products.map((product) => (
                    <li className={styles.item} key={product.id}>
                      <button
                        className={`like ${favorites.includes(product.id) ? 'active' : ''}`}
                        type="button"
                        onClick={() => handleToggleFavorite(product.id)}
                      >
                        <HeartIcon/>
                      </button>
                      <Link className={styles.link_img} to={`/catalog/${categoryId}/${product.id}`}>
                        <img
                          className={styles.img}
                          src={product.image_url}
                          alt={product.name}
                          width="500"
                          height="300"
                          loading={"lazy"}
                        />
                      </Link>
                      <Link className={styles.name_product} to={`/catalog/${categoryId}/${product.id}`}>
                        {product.name}
                      </Link>
                      <p className={styles.delivery}>
                        <span>Бесплатная доставка через 2ч</span>
                        <span className={styles.time}>с 10:00 до 23:00</span>
                      </p>
                      <span className={styles.price}>{formatPrice(product.price)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};