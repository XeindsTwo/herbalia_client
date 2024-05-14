import React, {useState, useEffect} from 'react';
import {Layout} from '../../components/Layout.jsx';
import axios from 'axios';
import {formatPrice} from "../../utils/priceUtils.js";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import styles from './Cart.module.scss';

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('/cart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCartItems(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const removeCartItem = async (productId) => {
    try {
      await axios.delete('/cart/remove', {
        data: {product_id: productId},
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchCartItems();
      toast.success('Товар успешно удалён из корзины');
    } catch (error) {
      console.error('Ошибка при удалении товара из корзины', error);
    }
  };

  const updateCartItemQuantity = async (productId, newQuantity) => {
    try {
      await axios.post(`/cart/update/${productId}`, {product_id: productId, quantity: newQuantity}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchCartItems();
    } catch (error) {
      console.error('Ошибка при обновлении количества товара', error);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.product_id === productId) {
        let quantity;
        if (newQuantity < 1) {
          quantity = 1;
        } else if (newQuantity > 50) {
          quantity = 50;
        } else {
          quantity = newQuantity;
        }
        updateCartItemQuantity(productId, quantity);
        return {...item, quantity};
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login'); // Перенаправляем на страницу входа при отсутствии токена
    }
  }, [navigate]);

  return (
    <Layout>
      <section className={`${styles.section} indent--breadcrumbs`}>
        <div className="container">
          {isLoading && <div>Loading...</div>}
          {error && <div>{error.message || 'Произошла ошибка при загрузке корзины'}</div>}
          {!isLoading && !error && (
            <>
              {cartItems.length === 0 ? (
                <div>Корзина пуста</div>
              ) : (
                <>
                  <h1 className={`${styles.title} title`}>Корзина товаров</h1>
                  <div className={styles.inner}>
                    <ul className={styles.list}>
                      {cartItems.map((item) => (
                        <li className={styles.item} key={item.id}>
                          <Link className={styles.photo} to={`/catalog/${item.product.category_id}/${item.product_id}`}>
                            <img
                              className={styles.img}
                              src={item.image_url}
                              alt={item.product.name}
                              width="120"
                              height="120"
                            />
                          </Link>
                          <div className={styles.info}>
                            <div className={styles.name}>{item.product.name}</div>
                            <div className={styles.price}>{formatPrice(item.product.price)}</div>
                            <div>
                              Общая стоимость - {formatPrice(item.product.price * item.quantity)}
                            </div>
                            <button
                              className={styles.delete}
                              type="button"
                              onClick={() => {
                                if (window.confirm('Вы уверены, что хотите удалить этот товар из корзины?')) {
                                  removeCartItem(item.product_id);
                                }
                              }}
                            >
                              Удалить
                            </button>
                          </div>
                          <div className={styles.counter}>
                            <button
                              className={`${styles.btn} ${styles.minus}`}
                              type="button"
                              onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                            >
                              <svg viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
                                <rect x="1" y="9" width="2" height="16" rx="1" transform="rotate(-90.0355 1 9)"></rect>
                              </svg>
                            </button>
                            <input
                              className={styles.quantity}
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.product_id, parseInt(e.target.value) || 0)}
                              onBlur={() => handleQuantityChange(item.product_id, Math.min(parseInt(e.target.value) || 0, 50))}
                            />
                            <button
                              className={`${styles.btn} ${styles.plus}`}
                              type="button"
                              onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                            >
                              <svg viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
                                <rect x="8" width="2" height="16" rx="1"></rect>
                                <rect x="1" y="9" width="2" height="16" rx="1" transform="rotate(-90.0355 1 9)"></rect>
                              </svg>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className={styles.right}>
                      <p className={styles.sum}>
                        Сумма <span>{formatPrice(calculateTotalPrice(cartItems))}</span>
                      </p>
                      <p className={styles.delivery}>
                        Стоимость доставки <span>0 ₽</span>
                      </p>
                      <p className={styles.total}>
                        Итого <span>{formatPrice(calculateTotalPrice(cartItems))}</span>
                      </p>
                      <a className={styles.order} href="">Оформить заказ</a>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};