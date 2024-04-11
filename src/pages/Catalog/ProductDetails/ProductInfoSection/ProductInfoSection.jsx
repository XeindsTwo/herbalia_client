import React, {useState} from 'react';
import styles from "./ProductInfoSection.module.scss";
import decorSrc from '../../../../assets/images/bird-proudct-detail.svg';
import {TabButton} from "./TabButton/TabButton.jsx";
import {TabContent} from "./TabContent/TabContent.jsx";

export const ProductInfoSection = ({composition}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <section className={`${styles.info} indent`}>
      <div className="container">
        <ul className={styles.benefits}>
          <li className={styles.benefits_item}>Срочная и бесплатная доставка</li>
          <li className={styles.benefits_item}>100% гарантия свежести</li>
          <li className={styles.benefits_item}>Соответствие состава и фото</li>
        </ul>
        <ul className={styles.buttons}>
          <TabButton
            title="Описание"
            active={activeTab === 0}
            onClick={() => handleTabClick(0)}
          />
          <TabButton
            title="Доставка"
            active={activeTab === 1}
            onClick={() => handleTabClick(1)}
          />
          <TabButton
            title="Оплата"
            active={activeTab === 2}
            onClick={() => handleTabClick(2)}
          />
        </ul>
        <div className={styles.tabs}>
          {activeTab === 0 && <TabContent activeTab={activeTab} composition={composition}/>}
          {activeTab === 1 && <TabContent activeTab={activeTab}/>}
          {activeTab === 2 && <TabContent activeTab={activeTab}/>}
        </div>
      </div>
      <img className={styles.decor} src={decorSrc} alt="decor"/>
    </section>
  );
};