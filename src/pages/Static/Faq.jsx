import {Layout} from "../../components/Layout.jsx";
import styles from './Static.module.scss';
import {Breadcrumbs} from "../../components/Breadcrumbs/Breadcrumbs.jsx";

export const Faq = () => {
  return (
    <Layout>
      <section className='indent indent--breadcrumbs'>
        <div className="container">
          <Breadcrumbs current={"Вопрос-ответ"}/>
          <h1 className={`${styles.title} title`}>Вопрос-ответ</h1>
          <div className={styles.text}>
            <ul className={styles.faq}>
              <li>
                <h2 className={styles.subtitle}>Как оформить заказ на доставку цветов?</h2>
                <p>
                  Для оформления заказа выберите букет и нажмите на кнопку "Заказать" или "Оформить заказ".
                  Заполните информацию об отправителе и получателе, если получатель другое лицо, и выберите
                  желаемый
                  способ оплаты.
                </p>
              </li>
              <li>
                <h2 className={styles.subtitle}>Как оплатить заказ?</h2>
                <p>
                  Оплатить заказ можно с помощью Банковской карты, Apple Pay, Google Pay, Наличными курьеру. Для
                  юр. лиц предусмотрена оплата по безналичному расчету - для этого оставьте заявку на <a
                  href="mailto:hello@herbalia.ru">hello@herbalia.ru</a>
                </p>
              </li>
              <li>
                <h2 className={styles.subtitle}>Сколько стоит доставка</h2>
                <p>
                  Доставка бесплатная в пределах черты города, Белореченск - это до Белореченского района, в
                  каждом городе свои зоны доставки. Автоматический расчёт стоимости доставки временно недоступен.
                  Стоимость может быть рассчитана по запросу или после оформления вами заказа.
                </p>
              </li>
              <li>
                <h2 className={styles.subtitle}>Как быстро вы доставите букет?</h2>
                <p>
                  У каждого букета указано минимальное время доставки. Минимальный интервал доставки 2 часа.
                  Доставка точно к часу не возможна, но вы всегда можете уточнить желаемый диапазон времени
                  доставки, мы постараемся всё сделать для вашего комфорта.
                </p>
              </li>
              <li>
                <h2 className={styles.subtitle}>До скольки можно заказать доставку цветов?</h2>
                <p>
                  Мы доставляем букеты до 23:00
                </p>
              </li>
              <li>
                <h2 className={styles.subtitle}>Как мне узнать, что букет доставлен?</h2>
                <p>
                  Когда букет будет доставлен, мы пришлем вам SMS сообщение на номер телефона, указанный при
                  оформлении заказа, и письмо на Email.
                </p>
              </li>
              <li>
                <h2 className={styles.subtitle}>Доставите ли вы букет, если я не знаю адрес?</h2>
                <p>
                  Да, если вы укажите номер телефона получателя в заказе. Курьер сам согласует с ним наиболее
                  удобное время и адрес доставки.
                </p>
              </li>
              <li>
                <h2 className={styles.subtitle}>Есть ли доставка в другой город?</h2>
                <p>
                  Актуальный список городов доставки представлен в блоке при выборе города. Мы активно развиваемся
                  и открываем представительства в новых городах. Следите за нашими обновлениями.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )
}