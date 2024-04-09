export const PriceInput = ({value, onChange, onBlur, error}) => {
  return (
    <>
      <label className="label" htmlFor="price">Цена (в ₽):</label>
      <span className="error" style={{display: error ? 'block' : 'none'}}>{error}</span>
      <input
        className="input input--all-in"
        type="number"
        id="price"
        name="price"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder='Введите цену'
      />
    </>
  );
};