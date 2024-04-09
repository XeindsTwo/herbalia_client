import styles from './DeliverySection.module.scss';
import flowers from '../../../assets/images/flowers.svg';

const deliveryItems = [
  "Вы покупаете в нашем интернет-магазине цветы с доставкой",
  "Мы привозим их в указанное место и в удобную дату/время",
  "Наш улыбчивый курьер вручает букет адресату",
  "Вы получаете СМС-сообщение и письмо на электронную почту о том, что заказ доставлен"
];

export const DeliverySection = () => {
  return (
    <section className="indent">
      <div className="container">
        <div className={styles.info}>
          <img className={styles.img} src={flowers} alt="" width="540" height="490"/>
          <div>
            <h2 className={`${styles.title} block-title`}>
              Заказать красивый букет цветов с доставкой
            </h2>
            <div className={styles.description}>
              <p>
                Посмотрите наш каталог. Мы делаем запоминающиеся композиции и исключительно из свежих цветов. Вы
                можете выбрать из имеющихся в каталоге или заказать подбор оригинального букета, который будет
                отвечать вкусам конкретного человека.
              </p>
              <p>
                Мы знаем, как впечатлить даже искушенного ценителя флористики. Наши букеты оригинальны,
                современны, актуальны к любому празднику. А еще дарить их можно без повода. Мы предлагаем цветы
                со срочной доставкой по Москве – балуйте своих любимых и себя свежими ароматными букетами цветов
                и стильными букетами в разных форматах: в кашпо, корзине, коробке, ящички в стиле прованс. Пусть
                ваш дом станет ещё уютнее с цветочными композициями от Herbalia!
              </p>
            </div>
          </div>
        </div>
        <ul className={styles.list}>
          {deliveryItems.map((deliveryItem, index) => (
            <li key={index} className={styles.item}>
              {deliveryItem}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}