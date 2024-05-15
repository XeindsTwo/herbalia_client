import React, {useState} from 'react';
import {AdminLayout} from "../../../components/AdminLayout.jsx";
import {useQuery} from "react-query";
import axios from "axios";
import styles from './Orders.module.scss';
import {Link} from "react-router-dom";
import {formatDate} from "../../../utils/dateUtils.js";
import {toast} from 'react-toastify';

export const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/admin/orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Ошибка при загрузке заказов');
    }
  };

  const {data, error, isLoading, refetch} = useQuery('orders', fetchOrders);

  const deleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/admin/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Заказ успешно удален');
      await refetch();
    } catch (error) {
      toast.error('Ошибка при удалении заказа');
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredOrders = data ? data.filter(order =>
    (order.phone_number && order.phone_number.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (order.delivery_address && order.delivery_address.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (order.name && order.name.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : [];

  return (
    <AdminLayout>
      <section>
        <div className={`container container--admin`}>
          <div>
            <h1 className="admin__title">Управление заказами</h1>
            <input
              className={'input input--480'}
              placeholder={"Поиск по номеру телефона, или адресу доставки"}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {isLoading && <p>Загрузка заказов...</p>}
            {error && <p>{error.message}</p>}
            {filteredOrders.length === 0 && (
              <p className={styles.empty}>Заказы не были найдены</p>
            )}
            {filteredOrders.length > 0 && (
              <>
                <ul className={styles.list}>
                  {filteredOrders.map(order => (
                    <li key={order.id} className={styles.order}>
                      <p className={styles.order_id}>Заказ №{order.id}</p>
                      <button className={styles.delete} onClick={() => {
                        if (window.confirm('Вы уверены, что хотите удалить этот заказ? Отменить действие будет невозможно')) {
                          deleteOrder(order.id);
                        }
                      }}>Удалить заказ
                      </button>
                      <ul className={styles.order_info}>
                        <li>Имя: <br/>{order.name}</li>
                        <li>Номер телефона: <br/>{order.phone_number}</li>
                        <li>Почта: <br/>{order.email}</li>
                        <li>Дата: <br/>{formatDate(order.created_at)}</li>
                        <li>Общая стоимость заказа: <br/>{order.total_price.toLocaleString()} &#8381;</li>
                        {order.delivery_address && <li>Адрес доставки: <br/>{order.delivery_address}</li>}
                        <li>Тип доставки: {order.delivery_option === 'delivery' ? 'Доставка' : 'Самовывоз'}</li>
                        <li>Способ оплаты: {order.payment_option === 'cash' ? 'Наличными' : 'Безналичный расчет'}</li>
                      </ul>
                      <ul className={styles.order_products}>
                        {order.products.map(product => (
                          <li key={product.id} className={styles.item}>
                            <Link
                              className={styles.link_img}
                              to={`/catalog/${product.category_id}/${product.id}`}
                              target="_blank"
                            >
                              <img src={product.image_url} alt={product.name}/>
                            </Link>
                            <div className="catalog__info">
                              <p className="catalog__article">Артикул: {product.article}</p>
                              <Link
                                className={styles.name_product}
                                to={`/catalog/${product.category_id}/${product.id}`}
                              >
                                {product.name}
                              </Link>
                              <div className="catalog__order">
                                <span>Количество товара - </span>{product.pivot.quantity} шт.
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};