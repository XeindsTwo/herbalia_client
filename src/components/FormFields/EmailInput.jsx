export const EmailInput = ({value, onChange, onBlur, error, label = true}) => {
  return (
    <>
      {label && <label className="label" htmlFor="email">Почта:</label>}
      <span className="error" style={{display: error ? 'block' : 'none'}}>{error}</span>
      <input
        className="input"
        id="email"
        name="email"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Ваша почта"
      />
    </>
  );
};