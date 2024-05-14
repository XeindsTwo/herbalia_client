export const NameCompany = ({value, onChange, onBlur, error, label = true}) => {
  return (
    <>
      {label && <label className="label" htmlFor="name_company">Название компании:</label>}
      <span className="error" style={{display: error ? 'block' : 'none'}}>{error}</span>
      <input
        className="input"
        type="text"
        id="name_company"
        name="company"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder='Введите название'
      />
    </>
  );
};