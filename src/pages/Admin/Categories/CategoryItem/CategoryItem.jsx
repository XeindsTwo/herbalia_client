import styles from './CategoryItem.module.scss';
import DeleteIcon from '../../../../assets/images/icons/delete.svg?react';
import EditIcon from '../../../../assets/images/icons/edit.svg?react';

export const CategoryItem = ({category, onEdit, onDelete}) => {
  const handleDeleteClick = () => {
    onDelete(category.id, category.name);
  };

  const handleEditClick = () => {
    onEdit(category);
  };

  return (
    <div className={styles.item}>
      <div className={styles.content}>
        <input type="hidden" value={category.order_index}/>
        <h3 className={styles.name}>{category.name}</h3>
        {category.subtitle && <p>{category.subtitle}</p>}
      </div>
      <div className={styles.actions}>
        <button className={`${styles.action} ${styles.edit}`} onClick={handleEditClick}>
          <EditIcon/>
        </button>
        <button className={`${styles.action} ${styles.delete}`} onClick={handleDeleteClick}>
          <DeleteIcon/>
        </button>
      </div>
    </div>
  );
};