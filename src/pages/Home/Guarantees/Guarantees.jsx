import styles from './Guarantees.module.scss';

import flower1 from '../../../assets/images/icons/guarantees/1.svg';
import flower2 from '../../../assets/images/icons/guarantees/2.svg';
import flower3 from '../../../assets/images/icons/guarantees/3.svg';
import flower4 from '../../../assets/images/icons/guarantees/4.svg';
import flower5 from '../../../assets/images/icons/guarantees/5.svg';

const guaranteesData = [
  {
    name: 'Фото букета перед доставкой',
    text: 'Точное соответствие вашим ожиданиям',
    imgSrc: flower1
  },
  {
    name: 'Безопасная сделка',
    text: 'При оплате банковской картой средства не списываются до момента доставки',
    imgSrc: flower2
  },
  {
    name: 'Защита клиента',
    text: 'В случае несоответствия букета моментальный возврат или бесплатный обмен',
    imgSrc: flower3
  },
  {
    name: 'Соответствуем ФЗ 54',
    text: 'Печатаем чеки онлайн и отправляем на ваш email',
    imgSrc: flower4
  },
  {
    name: 'Соответствуем ФЗ 152',
    text: 'Ваши персональные данные под защитой, доставка анонимна',
    imgSrc: flower5
  }
];

export const Guarantees = () => {
  return (
    <section className="indent">
      <div className="container">
        <h2 className={`${styles.title} block-title`}>Наши гарантии</h2>
        <ul className={styles.list}>
          {guaranteesData.map((item, index) => (
            <li key={index} className={styles.item}>
              <h3 className={styles.name}>{item.name}</h3>
              <p className={styles.text}>{item.text}</p>
              <img className={styles.img} src={item.imgSrc} width="110" height="110" alt="decor"/>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}