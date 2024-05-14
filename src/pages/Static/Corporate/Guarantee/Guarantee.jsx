import styles from './Guarantee.module.scss';

export const Guarantee = () => {
  return (
    <section className={`${styles.section} indent`}>
      <div className="container">
        <h2 className={`${styles.title} title`}>Наши гарантии</h2>
        <div className={styles.content}>
          <span className={styles.percent}>Наличие на сайте 99%</span>
          <p className={styles.text}>
            Весь представленный каталог композиций на сайте в наличии и вы можете уверенно оформлять заказ. Мы
            контролируем наличие каждого цветка и элемента декора и упаковки каждую секунду в автоматическом режиме.
            Погрешность в 1% остаётся на случай, если при сборке композиции флорист выявит брак или небольшая накладка в
            учёте в пиковые нагрузки работы.
          </p>
        </div>
      </div>
    </section>
  )
}