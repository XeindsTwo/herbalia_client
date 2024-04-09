import styles from "./TabContent.module.scss";
import bouquetOne from "../../../../assets/images/icons/care/bouquet/1.svg";
import bouquetTwo from "../../../../assets/images/icons/care/bouquet/2.svg";
import bouquetThree from "../../../../assets/images/icons/care/bouquet/3.svg";
import boxOne from "../../../../assets/images/icons/care/box/1.svg";
import boxTwo from "../../../../assets/images/icons/care/box/2.svg";
import driedOne from "../../../../assets/images/icons/care/dried_flowers/1.svg";
import driedTwo from "../../../../assets/images/icons/care/dried_flowers/2.svg";
import driedThree from "../../../../assets/images/icons/care/dried_flowers/3.svg";
import driedFour from "../../../../assets/images/icons/care/dried_flowers/4.svg";
import {useState} from "react";

const tabContentData = [
  {
    name: "Букет",
    items: [
      {
        image: bouquetOne,
        alt: "Уход за букетом",
        text: "Налейте в чистую вазу <br/> прохладную воду",
      },
      {
        image: bouquetTwo,
        alt: "Уход за букетом",
        text: "Цветы подрежьте под углом 45% <br/> и сразу поставьте в вазу",
      },
      {
        image: bouquetThree,
        alt: "Уход за букетом",
        text: "Меняйте воду ежедневно. <br/> Подрезайте раз в два дня",
      },
    ],
    transferItems: [
      "Букеты, упакованные в гелевый состав, рекомендуется оставлять в нём не более 4 часов.",
      "Перед установкой в вазу их нужно очистить от геля и подрезать",
    ]
  },
  {
    name: "В коробке и корзине",
    items: [
      {
        image: boxOne,
        alt: "Уход за букетом",
        text: "Композиции на оазисе (флор. губке) являются неразборными",
      },
      {
        image: boxTwo,
        alt: "Уход за букетом",
        text: "Ежедневно подливайте прохладную воду на флористическую губку",
      },
    ],
    transferItems: [],
  },
  {
    name: "Сухоцветы",
    items: [
      {
        image: driedOne,
        alt: "Уход за сухоцветами",
        text: "Не ставьте композицию в воду: цветы являются стабилизированными и не требуют воды",
      },
      {
        image: driedTwo,
        alt: "Уход за букетом",
        text: "Не увлажняйте воздух рядом с букетом: сухоцветы не любят лишнюю влагу",
      },
      {
        image: driedThree,
        alt: "Уход за букетом",
        text: "Не ставьте композицию на открытое солнце: некоторые растения могут выгорать",
      },
      {
        image: driedFour,
        alt: "Уход за букетом",
        text: "Чтобы убрать пыль, используйте широкую мягкую кисть",
      },
    ],
    transferItems: [
      "Сухоцветные композиции сохраняются очень долго: от 5 до 10 лет.",
      "Наслаждайтесь красотой, вдыхайте аромат трав!",
    ],
  },
]

export const TabsContent = ({activeTab}) => {
  const [tabContent] = useState(tabContentData);

  return (
    <>
      {tabContent.map((tab, index) => (
        <div key={index} className={styles.tab} style={{display: activeTab === index ? 'block' : 'none'}}>
          <span className={styles.name}>{tab.name}</span>
          <ul className={styles.list}>
            {tab.items.map((item, itemIndex) => (
              <li key={itemIndex} className={styles.item}>
                <img src={item.image} alt={item.alt}/>
                <p dangerouslySetInnerHTML={{__html: item.text}}/>
              </li>
            ))}
          </ul>
          {tab.transferItems.length > 0 && (
            <ol className={styles.transfer}>
              {tab.transferItems.map((transferItem, transferIndex) => (
                <li key={transferIndex}>{transferItem}</li>
              ))}
            </ol>
          )}
        </div>
      ))}
    </>
  )
}
