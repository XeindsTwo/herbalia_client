import {useState} from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';
import {Layout} from '../../components/Layout.jsx';
import {Link} from 'react-router-dom';
import {Breadcrumbs} from '../../components/Breadcrumbs/Breadcrumbs.jsx';
import {formatPrice} from '../../utils/priceUtils.js';
import vase from '../../assets/images/icons/vase.svg';
import styles from './CategoryProducts.module.scss';
import Skeleton from 'react-loading-skeleton';
import HeartIcon from '../../assets/images/icons/heart.svg?react';
import 'react-loading-skeleton/dist/skeleton.css';
import {Favorites} from "../../components/CartAndFavorites/Favorites.jsx";
import {Contacts} from "../../components/Contacts/Contacts.jsx";
import {Cart} from "../../components/CartAndFavorites/Cart.jsx";

const fetchProducts = async () => {
  const response = await axios.get(`/catalog`);
  return response.data;
};

export const Catalog = () => {
  const {data, isLoading, isError} = useQuery('products', fetchProducts);

  const [sortMethod, setSortMethod] = useState('newest');
  const {favorites, handleToggleFavorite} = Favorites();
  const {cartItems, handleAddToCart} = Cart();

  const sortProducts = (method, products) => {
    if (!products) return [];

    const sortedProducts = [...products];

    if (method === 'cheapest') {
      sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (method === 'expensive') {
      sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else {
      sortedProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return sortedProducts;
  };

  const sortedProducts = sortProducts(sortMethod, data?.products);

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  return (
    <Layout>
      <section className={'indent--breadcrumbs'}>
        <div className="container">
          <Breadcrumbs
            current={'Каталог'}
          />
          <div className={styles.top}>
            <h1 className={styles.name}>Каталог цветов</h1>
            {!isLoading && !isError && data && data.products && data.products.length > 0 && (
              <div className={styles.counters}>
                <span>от {formatPrice(data.min_price)}</span>
                <span>{data.total_count} шт</span>
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
              {!isLoading && sortedProducts.length === 0 && !isError && (
                <div className={styles.empty}>
                  <img src={vase} alt="Ваза декор" width={70} height={88}/>
                  <span className={styles.empty_top}>В каталоге пока пусто</span>
                  <p>В скором времени здесь появятся товары :)</p>
                </div>
              )}
              {!isLoading && sortedProducts.length > 0 && (
                <>
                  <select className={styles.select} value={sortMethod} onChange={(e) => setSortMethod(e.target.value)}>
                    <option value="cheapest">Сначала подешевле</option>
                    <option value="expensive">Сначала подороже</option>
                    <option value="newest">По новизне</option>
                  </select>
                  <ul className={styles.list}>
                    {sortedProducts.map((product) => (
                      <li className={styles.item} key={product.id}>
                        <button
                          className={`like ${favorites.includes(product.id) ? 'active' : ''}`}
                          type="button"
                          onClick={() => handleToggleFavorite(product.id)}
                        >
                          <HeartIcon/>
                        </button>
                        <Link className={styles.link_img} to={`/catalog/${product.category_id}/${product.id}`}>
                          <img
                            className={styles.img}
                            src={product.image_url}
                            alt={product.name}
                            width="500"
                            height="300"
                            loading={"lazy"}
                          />
                        </Link>
                        <Link className={styles.name_product} to={`/catalog/${product.id}`}>
                          {product.name}
                        </Link>
                        <p className={styles.delivery}>
                          <span>Бесплатная доставка через 2ч</span>
                          <span className={styles.time}>с 10:00 до 23:00</span>
                        </p>
                        <span className={styles.price}>{formatPrice(product.price)}</span>
                        {isInCart(product.id) ? (
                          <Link className={'add active'} to="/cart">В корзине</Link>
                        ) : (
                          <button
                            className={'add'}
                            onClick={() => handleAddToCart(product.id, 1)}
                          >
                            Купить
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      </section>
      <Contacts/>
    </Layout>
  );
};