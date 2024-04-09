import {Layout} from "../../components/Layout.jsx";
import styles from './Static.module.scss';
import {Breadcrumbs} from "../../components/Breadcrumbs/Breadcrumbs.jsx";

export const ContactsPage = () => {
  return (
    <Layout>
      <section className='indent indent--breadcrumbs'>
        <div className="container">
          <Breadcrumbs current={"Контакты"}/>
          <h1 className={`${styles.title} title`}>Контакты</h1>
          <div className={styles.text}>
            <p>
              <b>Поддержка:</b> по телефону с 10-00 до 22-00 - ежедневно. По email и пабликам
              в социальных сетях - круглосуточно.
            </p>
            <p>
              Бесплатная линия для абонентов России: <a href="tel:+79372363750">8 (937) 236-37-50</a>
            </p>
            <p>
              Вопросы по заказам: <a href="mailto:hello@herbalia.ru">hello@herbalia.ru</a>
            </p>
            <p className={styles.bottom}>
              <b>Реквизиты:</b>
            </p>
            <ul className={styles.empty}>
              <li>
                Общество с ограниченной ответственностью «Хербалиа»
              </li>
              <li>
                Почтовый адрес: 197110 Россия, Белореченск, ул. Ленина, д.68, офис 12
              </li>
              <li>
                Юридический адрес: 197110 Россия, Белореченск, ул. Ленина, д.68, офис 12
              </li>
              <li>
                ИНН 7810424635, КПП 781301001, ОГРН 1167847068663
              </li>
              <li>
                Расчётный счёт 40702 810 8100 0000 2537 в АО "Тинькофф Банк", БИК 044525974, Корр счёт 30101 810 1452
                5000 0974
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )
}