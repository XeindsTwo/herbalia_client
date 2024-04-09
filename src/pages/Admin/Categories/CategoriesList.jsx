import styles from './Categories.module.scss';
import {CategoryItem} from './CategoryItem/CategoryItem.jsx';

export const CategoriesList = ({categories, onDeleteCategory, onEditCategory}) => {
  return (
    <ul className={styles.list}>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          onDelete={() => onDeleteCategory(category.id)}
          onEdit={() => onEditCategory(category)}
        />
      ))}
    </ul>
  );
};