import React, {useState, useEffect} from 'react';
import {Layout} from '../../components/Layout.jsx';
import axios from 'axios';
import {formatPrice} from "../../utils/priceUtils.js";
import {Link, useNavigate} from "react-router-dom";
import styles from './Order.module.scss';
import vase from "../../assets/images/icons/vase.svg";
import {toast} from "react-toastify";

export const Order = () => {
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentOption, setPaymentOption] = useState('cash');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
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

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name,
      phone_number: phoneNumber,
      email,
      delivery_option: deliveryOption,
      delivery_address: deliveryAddress,
      comment,
      payment_option: paymentOption
    };

    try {
      const response = await axios.post('/order', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      alert('Заказ успешно оформлен. Наш менеджер свяжется с вами в ближайшее время.');
      navigate('/');
    } catch (error) {
      toast.error('Произошла ошибка при оформлении заказа');
      console.error('Ошибка при отправке формы:', error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Layout>
      <section className={`${styles.section} indent--breadcrumbs`}>
        <div className="container">
          {isLoading && <div>Загрузка данных...</div>}
          {error && <div>{error.message || 'Произошла ошибка при загрузке данных'}</div>}
          {!isLoading && !error && (
            <>
              {cartItems.length === 0 ? (
                <div className={styles.empty}>
                  <img src={vase} alt="Ваза декор" width={70} height={88}/>
                  <span className={styles.empty_top}>У вас нет товаров для оформления заказа</span>
                  <p>Мы будем рады выполнить ваш заказ</p>
                </div>
              ) : (
                <>
                  <h1 className={`${styles.title} title`}>Оформление заказа</h1>
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
                          </div>
                          <div className={styles.counter}>
                            Количество штук -
                            <input
                              className={styles.quantity}
                              type="number"
                              disabled={true}
                              value={item.quantity}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.itog}>
                    <p className={styles.sum}>
                      Сумма <span>{formatPrice(calculateTotalPrice(cartItems))}</span>
                    </p>
                    <p className={styles.delivery}>
                      Стоимость доставки <span>0 ₽</span>
                    </p>
                    <p className={styles.total}>
                      Итого <span>{formatPrice(calculateTotalPrice(cartItems))}</span>
                    </p>
                  </div>
                  <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.left}>
                      <ul className={styles.list}>
                        <li className="order__list-item">
                          <input
                            className="input"
                            name="name"
                            id="name"
                            maxLength="255"
                            type="text"
                            placeholder="Ваше имя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </li>
                        <li className="order__list-item">
                          <input
                            className="input"
                            name="phone_number"
                            id="phone_number"
                            maxLength="255"
                            type="text"
                            placeholder="Ваш номер телефона"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                          />
                        </li>
                        <li className="order__list-item">
                          <input
                            className="input"
                            name="email"
                            id="email"
                            maxLength="255"
                            type="text"
                            placeholder="Ваша электронная почта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </li>
                        <li className="order__list-item">
                          <input
                            className="input"
                            name="delivery_address"
                            id="delivery_address"
                            maxLength="255"
                            type="text"
                            placeholder="Ваш адрес доставки"
                            value={deliveryOption === 'delivery' ? deliveryAddress : ''}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            disabled={deliveryOption !== 'delivery'}
                          />
                        </li>
                        <li className="order__list-item">
                          <textarea
                            className="input input--textarea"
                            name="comment"
                            id="comment"
                            maxLength="2000"
                            placeholder="Ваш комментарий (необязательно)"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </li>
                      </ul>
                      <p className={styles.confirm}>
                        Отправляя данные через эту форму, Вы автоматически соглашаетесь на <Link
                        to="/policy-personal-data/">политику конфиденциальности</Link>
                      </p>
                      <button className={styles.order} type="submit">Подтвердить и оформить</button>
                    </div>
                    <div className="order__right">
                      <div className={styles.order_item}>
                        <span className="order__name">Вариант доставки:</span>
                        <li className={styles.li}>
                          <input
                            className={styles.radio}
                            type="radio"
                            id="pickup"
                            name="delivery_option"
                            value="pickup"
                            checked={deliveryOption === 'pickup'}
                            onChange={() => setDeliveryOption('pickup')}
                          />
                          <label htmlFor="pickup">Самовывоз</label>
                        </li>
                        <li className={styles.li}>
                          <input
                            className={styles.radio}
                            type="radio"
                            id="delivery"
                            name="delivery_option"
                            value="delivery"
                            checked={deliveryOption === 'delivery'}
                            onChange={() => setDeliveryOption('delivery')}
                          />
                          <label htmlFor="delivery">Доставка</label>
                        </li>
                      </div>
                      <div className={styles.order_item}>
                        <span className="order__name">Вариант оплаты:</span>
                        <li className={styles.li}>
                          <input
                            className={styles.radio}
                            type="radio"
                            id="cash"
                            name="payment_option"
                            value="cash"
                            checked={paymentOption === 'cash'}
                            onChange={() => setPaymentOption('cash')}
                          />
                          <label htmlFor="cash">Наличный расчет</label>
                        </li>
                        <li className={styles.li}>
                          <input
                            className={styles.radio}
                            type="radio"
                            id="non-cash"
                            name="payment_option"
                            value="non-cash"
                            checked={paymentOption === 'non-cash'}
                            onChange={() => setPaymentOption('non-cash')}
                          />
                          <label htmlFor="non-cash">Безналичный расчет</label>
                        </li>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};