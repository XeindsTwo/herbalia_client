import EyeClosed from '../../assets/images/icons/eye-closed.svg?react';
import EyeOpened from '../../assets/images/icons/eye-open.svg?react';
import {useState} from "react";

export const PasswordInput = ({value, onChange, onBlur, error, showError, autocomplete}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      setShowPassword(false);
    }, 1500);
    setTimeoutId(id);
  };

  return (
    <>
      <label className="label" htmlFor="password">Пароль:</label>
      {showError && <span className="error" style={{display: error ? 'block' : 'none'}}>{error}</span>}
      <div className='input-password'>
        <input
          className="input input--password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Ваш пароль"
          autoComplete={autocomplete ? 'new-password' : 'off'}
        />
        <button
          type="button"
          className='show-password'
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <EyeOpened/> : <EyeClosed/>}
        </button>
      </div>
    </>
  );
};