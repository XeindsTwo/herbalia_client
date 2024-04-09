export const LoginInput = ({value, onChange, onBlur, error, showError, autocomplete}) => {
  return (
    <>
      <label className="label" htmlFor="login">Логин</label>
      {showError && error && <span className="error" style={{display: 'block'}}>{error}</span>}
      <input
        className="input"
        name="login"
        id="login"
        type="text"
        placeholder="Введите логин"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autocomplete ? "username" : 'off'}
      />
    </>
  );
};