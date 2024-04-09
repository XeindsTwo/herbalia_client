import styles from './ImprovementsList.module.scss';
import {ImprovementItem} from "../ImprovementItem/ImprovementItem.jsx";

export const ImprovementsList = ({filteredImprovements, handleOpenDeleteModal}) => {
  return (
    <ul className={styles.list}>
      {filteredImprovements.map(improvement => (
        <ImprovementItem
          improvement={improvement}
          key={improvement.id}
          onDelete={() => handleOpenDeleteModal(improvement.id, improvement.name)}
        />
      ))}
    </ul>
  );
};