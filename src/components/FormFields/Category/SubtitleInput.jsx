export const SubtitleInput = ({value, onChange, onBlur, error}) => {
  return (
    <>
      <label className="label" htmlFor="subtitle">Подзаголовок (необязательно):</label>
      <span className="error" style={{display: error ? 'block' : 'none'}}>{error}</span>
      <input
        className="input input--all-in"
        type="text"
        id="subtitle"
        name="subtitle"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder='Введите текст'
      />
    </>
  );
};