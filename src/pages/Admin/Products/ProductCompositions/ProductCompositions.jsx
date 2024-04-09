import {useState} from 'react';
import styles from './ProductCompositions.module.scss';
import {CompositionItem} from './CompositionItem/CompositionItem.jsx';

export const ProductCompositions = ({onChange}) => {
  const [compositions, setCompositions] = useState([{name: '', quantity: 1, id: 1}]);
  const [nextId, setNextId] = useState(2);

  const handleAddComposition = () => {
    if (compositions.length >= 10) return;
    setCompositions([...compositions, {name: '', quantity: 1, id: nextId}]);
    setNextId(nextId + 1);
    onChange([...compositions, {name: '', quantity: 1, id: nextId}]);
  };

  const handleChange = (id, field, value) => {
    const updatedCompositions = compositions.map((composition) =>
      composition.id === id ? {...composition, [field]: value} : composition
    );
    setCompositions(updatedCompositions);
    onChange(updatedCompositions);
  };

  const handleDelete = (id) => {
    const updatedCompositions = compositions.filter((composition) => composition.id !== id);
    setCompositions(updatedCompositions);
    onChange(updatedCompositions);
  };

  return (
    <div>
      <button className={styles.plus} type="button" onClick={handleAddComposition} disabled={compositions.length >= 9}>
        + Добавить элемент состава
      </button>
      <ul className={styles.list}>
        {compositions.map((composition, index) => (
          <CompositionItem
            key={composition.id}
            name={composition.name}
            quantity={composition.quantity}
            onChange={handleChange}
            onDelete={handleDelete}
            isFirstItem={index === 0}
            id={composition.id}
          />
        ))}
      </ul>
    </div>
  );
};