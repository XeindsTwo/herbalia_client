import {Layout} from "../../../components/Layout.jsx";
import styles from '../Static.module.scss';
import {Breadcrumbs} from "../../../components/Breadcrumbs/Breadcrumbs.jsx";
import {Benefits} from "./Benefits/Benefits.jsx";
import {Guarantee} from "./Guarantee/Guarantee.jsx";
import {TopReviews} from "../../Home/TopReviews/TopReviews.jsx";
import {CorporateForm} from "./CorporateForm/CorporateForm.jsx";

export const Corporate = () => {
  return (
    <Layout>
      <section className='indent indent--breadcrumbs'>
        <div className="container">
          <Breadcrumbs current={"Корпоративным клиентам"}/>
          <h1 className={`${styles.title} title`}>Корпоративным клиентам</h1>
          <div className={styles.text}>
            <p>
              Мы готовы предложить лучший сервис флористических услуг для организаций, которые хотят оформить заказ
              цветов сотрудникам онлайн.
            </p>
            <p>
              <b>Наш сервис вам необходим, если вы желаете:</b>
            </p>
            <ul className={styles.dots}>
              <li>
                Поздравить с цветами сотрудников компании;
              </li>
              <li>
                Поздравить или выразить благодарность в виде цветов партнёрам;
              </li>
              <li>
                Оформить цветами мероприятия или конференц-зал;
              </li>
              <li>
                Оформить цветами фойе, ресепшен или столы в ресторанах
              </li>
            </ul>
            <br/>
            <p>Мы с удовольствием подойдём к вашим задачам индивидуально и предложим решение.</p>
            <p>Сервис Herbalia открыт для сотрудничества с Российскими организациями и нерезидентами.</p>
            <p>Мы принимаем оплату в валютах: RUB, USD, EUR.</p>
            <br/>
            <h2 className={styles.subtitle}>Как это работает?</h2>
            <ol>
              <li>
                Вы можете выбрать букет из нашего каталога и оформить заказ самостоятельно. Счёт на оплату будет
                сформирован автоматически.
              </li>
              <li>
                Если у вас индивидуальный заказ или вы хотите автоматизировать процесс выбора букета и доставки по
                определённым дням, напишите нам на <a href="mailto:business@herbalia.ru">business@herbalia.ru</a> -
                наши менеджеры учтут ваши пожелания.
              </li>
              <li>
                Возможные формы оплаты: по счёту (авансовый платёж или платёж с отсрочкой), оплата с депозита,
                наличными или банковской картой на сайте (возможно оплата картой онлайн до или после выполнения
                заказа)
              </li>
            </ol>
          </div>
        </div>
      </section>
      <Benefits/>
      <Guarantee/>
      <TopReviews/>
      <CorporateForm/>
    </Layout>
  )
}