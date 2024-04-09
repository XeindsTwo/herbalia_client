export const NameInput = ({value, onChange, onBlur, error}) => {
  return (
    <>
      <label className="label" htmlFor="name">Название товара:</label>
      <span className="error" style={{display: error ? 'block' : 'none'}}>{error}</span>
      <input
        className="input input--all-in"
        type="text"
        id="name"
        name="name"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder='Введите название'
      />
    </>
  );
};