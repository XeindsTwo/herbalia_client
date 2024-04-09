import styles from './ImprovementItem.module.scss';
import {formatDate} from "../../../../utils/dateUtils.js";

export const ImprovementItem = ({improvement, onDelete}) => {
  const handleDelete = () => {
    onDelete(improvement.id);
  };

  return (
    <li className={styles.item}>
      <div className={styles.control}>
        <button className={styles.btn} onClick={handleDelete}>
          Удалить
        </button>
        <time className={styles.date}>{formatDate(improvement.created_at)}</time>
      </div>
      <span className={styles.name}>{improvement.name}</span>
      <a className={styles.email} href={`mailto:${improvement.email}`}>
        {improvement.email}
      </a>
      <pre className={styles.comment}>{improvement.suggestion_comment}</pre>
    </li>
  )
}