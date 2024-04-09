import styles from "./TabsButton.module.scss";

export const TabsButton = ({activeTab, handleTabClick}) => {
  return (
    <ul className={styles.list}>
      <li>
        <button
          className={`${styles.btn} ${activeTab === 0 ? styles.btn_active : ''}`}
          type="button"
          onClick={() => handleTabClick(0)}
        >
          Букет
        </button>
      </li>
      <li>
        <button
          className={`${styles.btn} ${activeTab === 1 ? styles.btn_active : ''}`}
          type="button"
          onClick={() => handleTabClick(1)}
        >
          В коробке и корзине
        </button>
      </li>
      <li>
        <button
          className={`${styles.btn} ${activeTab === 2 ? styles.btn_active : ''}`}
          type="button"
          onClick={() => handleTabClick(2)}
        >
          Сухоцветы
        </button>
      </li>
    </ul>
  )
}
