import styles from './Aside.module.scss';
import {LogoutButton} from "../LogoutButton/LogoutButton.jsx";

export const Aside = ({tabOptions, activeTab, onTabClick}) => {
  const handleClick = (tabId) => {
    onTabClick(tabId);
    document.activeElement.blur();
  };

  return (
    <aside className={styles.aside}>
      <ul className={styles.list}>
        {tabOptions.map((tabOption) => (
          <li key={tabOption.id}>
            <button
              className={`${styles.link} ${activeTab === tabOption.id && styles.link_active}`}
              onClick={() => handleClick(tabOption.id)}
              type={"button"}
            >
              {tabOption.label}
            </button>
          </li>
        ))}
      </ul>
      <LogoutButton/>
    </aside>
  );
}