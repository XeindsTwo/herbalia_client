import {Layout} from "../../components/Layout.jsx";
import styles from './Static.module.scss';
import {Breadcrumbs} from "../../components/Breadcrumbs/Breadcrumbs.jsx";

export const Delivery = () => {
  return (
    <Layout>
      <section className='indent indent--breadcrumbs'>
        <div className="container">
          <Breadcrumbs current={"Доставка"}/>
          <h1 className={`${styles.title} title`}>Доставка</h1>
          <div className={styles.text}>
            <p>
              Доставка по городу Белореченск — осуществляется бесплатно.
            </p>
            <p>
              Цена доставки за пределы (отмечено на карте) устанавливается в зависимости от расстояния. Вы можете
              проверить свой адрес доставки и узнать примерную стоимость ниже, указав адрес доставки.
            </p>
            <p>
              Крайнее ближайшее время доставки указано в каждой композиции и зависит от сложности букета.
            </p>
            <p>
              Доставка осуществляется в 2 (двух) часовых интервалах с 10:00 до 23:00.
            </p>
            <p>
              Предзаказ на текущий день до 19:00 по местному времени города доставки.
            </p>
            <p>
              Ожидание получателя букета курьером до 15 минут. Повторная доставка осуществляется с доплатой за выезд
              курьера.
            </p>
            <p>
              Поскольку цветы являются скоропортящимся продуктом, через 24 часа с момента несостоявшейся доставки
              получателю, заказ оплачивается повторно или вывозится самостоятельно. При отказе от повторной доставки,
              оплата не возвращается, и взимается в полном объёме ввиду компенсации затрат по данному заказу.
            </p>
            <p>
              Мы можем:
            </p>
            <ul className={styles.dots}>
              <li>
                Доставить букет без адреса и времени
              </li>
              <li>
                Доставить в любое учреждение: гостиница, больница и др.
              </li>
              <li>
                Приложить к цветам ваш подарок
              </li>
              <li>
                Согласовать иные индивидуальные условия сюрприза
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )
}