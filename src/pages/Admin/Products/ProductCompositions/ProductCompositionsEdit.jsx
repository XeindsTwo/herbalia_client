import React, {useState, useEffect} from 'react';
import styles from './ProductCompositions.module.scss';
import {CompositionItem} from './CompositionItem/CompositionItem.jsx';

export const ProductCompositionsEdit = ({composition, onChange}) => {
  const [compositions, setCompositions] = useState([]);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    setCompositions(composition || [{name: '', quantity: 1, id: 1}]);
  }, [composition]);

  const handleAddComposition = () => {
    if (compositions.length >= 10) return;
    const newComposition = {name: '', quantity: 1, id: nextId};
    setCompositions([...compositions, newComposition]);
    onChange([...compositions, newComposition]);
    setNextId(nextId + 1);
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