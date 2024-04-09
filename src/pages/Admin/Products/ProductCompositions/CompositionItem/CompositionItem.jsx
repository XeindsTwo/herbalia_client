import PropTypes from 'prop-types';
import styles from './CompositionItem.module.scss';

export const CompositionItem = ({name, quantity, onChange, onDelete, isFirstItem, id}) => {
  return (
    <li className={`${styles.row} ${isFirstItem ? styles.top : ''}`}>
      {!isFirstItem && (
        <button className={styles.delete} type="button" onClick={() => onDelete(id)}>Удалить</button>
      )}
      <div className={styles.content}>
        <div className={styles.column}>
          <label className='label' htmlFor={`elementName_${id}`}>Название:</label>
          <input
            className="input"
            type="text"
            id={`elementName_${id}`}
            placeholder="Элемент состава"
            value={name}
            onChange={(e) => onChange(id, 'name', e.target.value)}
          />
        </div>
        <div className={`${styles.column} ${styles.quantity}`}>
          <label className='label' htmlFor={`elementQuantity_${id}`}>Кол-во:</label>
          <input
            className="input input--center"
            type="number"
            id={`elementQuantity_${id}`}
            value={quantity}
            placeholder="Кол-во"
            onChange={(e) => onChange(id, 'quantity', e.target.value)}
          />
        </div>
      </div>
    </li>
  );
};

CompositionItem.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isFirstItem: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};