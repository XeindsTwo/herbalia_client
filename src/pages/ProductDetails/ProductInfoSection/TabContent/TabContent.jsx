import {Link} from "react-router-dom";
import styles from './TabContent.module.scss';
import ArrowCircle from '../../../../assets/images/icons/arrow-circle.svg?react';

export const TabContent = ({activeTab, composition}) => {
  return (
    <>
      {activeTab === 0 && composition && (
        <div className={styles.tab} style={{display: 'block'}}>
          <ul className={styles.columns}>
            <li>
              <span className={styles.name}>Состав как на фото</span>
              <ul className={styles.composition}>
                {composition.map(item => (
                  <li key={item.id}>
                    {item.name} - {item.quantity} шт
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      )}
      {activeTab === 1 && (
        <div className={styles.tab} style={{display: 'block'}}>
          <p className={styles.text}>
            Доставка в пределах Белореченского района осуществляется бесплатно.
            За пределы установленной зоны цена рассчитывается автоматически при оформлении заказа.
            <br/>
            <br/>
            Доставка осуществляется ежедневно с 10:00 до 23:00, в двухчасовых интервалах. Если необходимо другое
            время доставки или доставка точно к часу, вы можете предварительно согласовать его с нашей Службой
            заботы, написав нам в онлайн-чат или в мессенджер, указанный на сайте.
          </p>
          <Link className={styles.link} to="/delivery">
            Подробнее о доставке
            <span className={styles.circle}>
              <ArrowCircle/>
            </span>
          </Link>
        </div>
      )}
      {activeTab === 2 && (
        <div className={styles.tab} style={{display: 'block'}}>
          <p className={styles.text}>
            Вы можете оплатить любым удобным способом: банковской картой на сайте, сбп (система быстрых
            платежей), наличными курьеру, Yandex Pay, Apple Pay, Tinkoff Pay или по счёту для компаний.
          </p>
          <Link className={styles.link} to="/payment">
            Подробнее об оплате
            <span className={styles.circle}>
              <ArrowCircle/>
            </span>
          </Link>
        </div>
      )}
    </>
  );
};