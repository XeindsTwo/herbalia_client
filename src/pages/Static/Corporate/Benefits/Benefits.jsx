import styles from "./Benefits.module.scss";
import oneIcon from "../../../../assets/images/corporate/1.svg";
import twoIcon from "../../../../assets/images/corporate/2.svg";
import threeIcon from "../../../../assets/images/corporate/3.svg";

const benefitsData = [
  {
    icon: oneIcon,
    subtitle: "Быстрое оформление",
    description: "Работаем сразу после регистрации заявки"
  },
  {
    icon: twoIcon,
    subtitle: "Автоматизация",
    description: "Оформляете заказ - всё остальное сделает система моментально"
  },
  {
    icon: threeIcon,
    subtitle: "Прозрачно",
    description: "Соответствие представленному каталогу. Фото перед доставкой"
  }
];

const BenefitItem = ({icon, subtitle, description}) => (
  <li>
    <img className={styles.img} src={icon} alt="декор" width={100} height={100}/>
    <span className={styles.subtitle}>{subtitle}</span>
    <p className={styles.description}>{description}</p>
  </li>
);

export const Benefits = () => {
  return (
    <section className={'indent'}>
      <div className="container">
        <h2 className={'title'}>Всё, что вам нужно</h2>
        <ul className={styles.list}>
          {benefitsData.map((benefit, index) => (
            <BenefitItem
              key={index}
              icon={benefit.icon}
              subtitle={benefit.subtitle}
              description={benefit.description}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}