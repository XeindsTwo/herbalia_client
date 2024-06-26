import styles from './Possibilities.module.scss';

const possibilitiesData = [
  {
    title: 'Удивить свою «вторую половинку» оригинальным букетом',
    description: 'Мы доставим букет и подарки прямо домой или любое другое место. Это особый знак внимания, признание в искренних чувствах, яркое поздравление и вдохновляющий момент в ваших отношениях.'
  },
  {
    title: 'Поздравить родных и близких',
    description: 'Даже если вы далеко от родных и друзей, хотя так хотели быть рядом – дайте им понять, что помните о них и цените. Закажите цветочную композицию семье, или роскошный букет родителям на годовщину свадьбы, поздравьте любимого учителя оригинальной композицией в коробке, написав пожелания в открытке. А мы доставим его в удобное время и место.'
  },
  {
    title: 'Подбодрить коллегу по работе',
    description: 'Привезем коробочку с цветами и вкусностями посреди рабочего дня. Поможем поздравить стильным букетом или необычной дизайнерской композицией.'
  },
  {
    title: 'Заказать букет бизнес-партнеру',
    description: 'Вы цените ваши деловые и личные отношения с партнёрами по бизнесу и хотели бы подчеркнуть это неформально? Самый лучший способ продемонстрировать это - отправить авторский букет или композицию в корзине и написать слова в открытке к букету. У нас вы найдёте самую большую подборку композиций для руководителей, как для женщин, так и для мужчин.'
  }
]

export const Possibilities = () => {
  return (
    <section className={'indent'}>
      <div className="container">
        <h2 className="block-title">Что можно с Herbalia?</h2>
        <ul className={styles.list}>
          {possibilitiesData.map((possibility, index) => (
            <li className={styles.item} key={index}>
              <h3 className={styles.name}>{possibility.title}</h3>
              <p className={styles.text}>{possibility.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}