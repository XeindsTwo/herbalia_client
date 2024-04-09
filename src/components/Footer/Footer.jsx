import styles from './Footer.module.scss';
import {Link} from "react-router-dom";
import ApplePay from '../../assets/images/icons/footer/apple-pay.svg?react';
import GooglePay from '../../assets/images/icons/footer/google-pay.svg?react';
import Mastercard from '../../assets/images/icons/footer/mastercard.svg?react';
import Shop from '../../assets/images/icons/footer/shop.svg?react';
import UnionPay from '../../assets/images/icons/footer/union-pay.svg?react';
import Visa from '../../assets/images/icons/footer/visa.svg?react';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <nav>
            <span className={styles.name}>Для клиентов</span>
            <ul className={styles.list}>
              <li className={styles.item}>
                <Link className={styles.link} to={'/about/'}>О компании</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={'/reviews/'}>Отзывы</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={'/contacts/'}>Контакты</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={'/payment/'}>Оплата</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={'/delivery/'}>Доставка</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={'/flower-care/'}>Уход за цветами</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={'/guarantee/'}>Гарантии</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={'/how-order/'}>Как заказать</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={'/faq/'}>Вопросы-ответ</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={'/bonus-program/'}>Бонусная программа</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={'/agreement/'}>Пользовательское соглашение</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={'/corporate/'}>Корпоративным клиентам</Link>
              </li>
            </ul>
          </nav>
          <nav>
            <span className={styles.name}>Праздники</span>
            <ul className={styles.list}>
              <li className={styles.item}>
                <Link className={styles.link} to={''}>14 февраля</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={''}>8 марта</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={''}>1 мая</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={''}>9 мая</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={''}>Последний звонок</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={''}>Выпускной</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={''}>День матери</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={''}>1 сентября</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={''}>День учителя</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={''}>Новый год</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.bottom}>
          <div className={styles.author}>
            <span>© 2023 Herbalia</span>
            <span>г. Белореченск, ул. Ленина, д.68, офис 12</span>
          </div>
          <div className={styles.bottom_links}>
            <Link className={styles.bottom_link} to="/policy-personal-data/">Политика конфиденциальности</Link>
            <Link className={styles.bottom_link} to="/privacy">Согласие на обработку персональных данных</Link>
          </div>
          <div className={styles.payments} role="list">
            <ApplePay/>
            <GooglePay/>
            <Mastercard/>
            <Shop/>
            <UnionPay/>
            <Visa/>
          </div>
        </div>
      </div>
    </footer>
  )
}
