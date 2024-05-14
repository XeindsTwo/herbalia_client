import {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useQuery} from 'react-query';
import {Layout} from '../../components/Layout.jsx';
import {Breadcrumbs} from '../../components/Breadcrumbs/Breadcrumbs.jsx';
import {formatPrice} from '../../utils/priceUtils.js';
import vase from '../../assets/images/icons/vase.svg';
import styles from './SearchPage.module.scss';
import Skeleton from 'react-loading-skeleton';
import HeartIcon from '../../assets/images/icons/heart.svg?react';
import 'react-loading-skeleton/dist/skeleton.css';
import {Favorites} from "../../components/CartAndFavorites/Favorites.jsx";
import axios from 'axios';
import {Cart} from "../../components/CartAndFavorites/Cart.jsx";

const fetchProducts = async (query) => {
  const response = await axios.post('/catalog/search', {query}, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  return response.data.products;
};

export const SearchPage = () => {
  const location = useLocation();
  const {favorites, handleToggleFavorite} = Favorites();
  const {cartItems, handleAddToCart} = Cart();
  const [sortMethod, setSortMethod] = useState('newest');
  const query = location.state?.query || '';

  const {data: products = [], isLoading, isError} = useQuery(
    ['searchProducts', query],
    () => fetchProducts(query),
    {enabled: !!query}
  );

  const sortedProducts = [...products].sort((a, b) => {
    if (sortMethod === 'cheapest') return parseFloat(a.price) - parseFloat(b.price);
    if (sortMethod === 'expensive') return parseFloat(b.price) - parseFloat(a.price);
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  return (
    <Layout>
      <section className={'indent--breadcrumbs'}>
        <div className="container">
          <Breadcrumbs current={'Поиск товаров'}/>
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
                  <span className={styles.empty_top}>Товары не были найдены</span>
                  <p>Попробуйте поискать что-то другое</p>
                </div>
              )}
              {products.length > 0 && (
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
                        <Link className={styles.name_product} to={`/catalog/${product.category_id}/${product.id}`}>
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
    </Layout>
  );
};