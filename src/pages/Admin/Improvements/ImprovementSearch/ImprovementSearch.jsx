import styles from './ImprovementSearch.module.scss';

export const ImprovementSearch = ({searchQuery, setSearchQuery}) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input
      className={`input ${styles.search}`}
      type="text"
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder={'Поиск по имени, почте и предложению...'}
    />
  );
};