import {Layout} from "../../../components/Layout.jsx";
import styles from './FlowerCare.module.scss';
import {Breadcrumbs} from "../../../components/Breadcrumbs/Breadcrumbs.jsx";
import winter from '../../../assets/images/icons/care/winter.svg';
import fruits from '../../../assets/images/icons/care/fruits.svg';
import conditions from '../../../assets/images/icons/care/conditions.svg';
import {useState} from "react";
import {TabsButton} from "./TabsButtons/TabsButton.jsx";
import {TabsContent} from "./TabsContent/TabsContent.jsx";

export const FlowerCare = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index) => {
    setActiveTab(index);
    document.activeElement.blur();
  };

  return (
    <Layout>
      <section className={`${styles.care} indent indent--breadcrumbs`}>
        <div className="container">
          <Breadcrumbs current={"Уход за цветами"}/>
          <h1 className='title'>Уход за цветами</h1>
          <p className={styles.subtext}>Наши рекомендации по уходу за цветами в домашних условиях</p>
          <TabsButton activeTab={activeTab} handleTabClick={handleTabClick}/>
          <TabsContent activeTab={activeTab}/>
          <div className={styles.important}>
            <h2 className={styles.important_title}>Это тоже важно</h2>
            <ul className={styles.conditions}>
              <li className={styles.conditions_item}>
                <img src={winter} alt="уход за цветами"/>
                <p>
                  Зимой букету с улицы нужно дать согреться 10 минут в упаковке или 5 минут без неё (не больше). И
                  только потом ставьте в воду, иначе увянут.
                </p>
              </li>
              <li className={`${styles.conditions_item} ${styles.conditions_item_fruits}`}>
                <img src={fruits} alt="уход за цветами"/>
                <p>
                  Не ставьте цветы рядом с фруктами. Они выделяют этилен, а цветы его не любят.
                </p>
              </li>
              <li className={`${styles.conditions_item} ${styles.conditions_item_harm}`}>
                <img src={conditions} alt="уход за цветами"/>
                <p>
                  Цвет не любят жару, сквозняк или холод, а также прямого солнца. Поэтому не ставьте букет у
                  батареи, под кондиционером или на подоконнике.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )
}