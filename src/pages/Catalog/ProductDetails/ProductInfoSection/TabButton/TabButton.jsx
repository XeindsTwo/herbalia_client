import React from 'react';
import styles from "./TabButton.module.scss";

export const TabButton = ({title, active, onClick}) => (
  <li>
    <button
      className={`${styles.button} ${active && styles.active}`}
      type="button"
      onClick={onClick}
    >
      {title}
    </button>
  </li>
);