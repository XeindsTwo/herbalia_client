import styles from './Original.module.scss';
import imgOne from '../../../assets/images/original-one.svg';
import imgTwo from '../../../assets/images/original-two.svg';

export const Original = () => {
  return (
    <section className={`${styles.original} indent`}>
      <div className="container">
        <h2 className={`${styles.title} title`}>
          Сервис Herbalia помогает делать оригинальные подарки
        </h2>
        <p className={styles.text}>
          Мы составляем чудесные букеты и цветочные композиции и доставляем их в любую точку Белореченска – в день
          заказа (или нужное время) и бесплатно в пределах Белореченского района.
        </p>
      </div>
      <img className={`${styles.img} ${styles.imgOne}`} src={imgOne} alt="decor"
           width="425" height="270"/>
      <img className={`${styles.img} ${styles.imgTwo}`} src={imgTwo} alt="decor"
           width="466" height="260"/>
    </section>
  )
}