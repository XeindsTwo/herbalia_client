import styles from './Checkbox.module.scss';
import {useState} from "react";

export const Checkbox = ({children, bottom = false, isChecked, onChange}) => {
  const [checked, setChecked] = useState(isChecked);

  const handleCheckboxChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <label className={`${styles.checkbox} ${bottom ? styles.bottom : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span className={styles.checkmark}></span>
      {children}
    </label>
  );
};