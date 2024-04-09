export const NameInput = ({value, onChange, onBlur, error, label = true}) => {
  return (
    <>
      {label && <label className="label" htmlFor="name">Имя:</label>}
      <span className="error" style={{display: error ? 'block' : 'none'}}>{error}</span>
      <input
        className="input"
        type="text"
        id="name"
        name="name"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder='Ваше имя'
      />
    </>
  );
};