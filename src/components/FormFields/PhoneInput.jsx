import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

export const PhoneInput = ({value, onChange, onBlur, error, label = true}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;

    const getInputNumbersValue = (input) => {
      return input.value.replace(/\D/g, '');
    };

    const onPhoneInput = (e) => {
      let input = e.target;
      let inputNumbersValue = getInputNumbersValue(input);
      let formattedInputValue = "";
      let selectionStart = input.selectionStart;

      if (!inputNumbersValue) {
        return (input.value = "");
      }

      if (input.value.length !== selectionStart) {
        if (e.data && /\D/g.test(e.data)) {
          input.value = inputNumbersValue;
        }
        return;
      }

      if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] === "9") {
          inputNumbersValue = "7" + inputNumbersValue;
        }
        let firstSymbol = inputNumbersValue[0] === "8" ? "8" : "+7";
        formattedInputValue = firstSymbol + " ";
        if (inputNumbersValue.length > 1) {
          formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
          formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
          formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
          formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
        }
      } else {
        formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
      }
      input.value = formattedInputValue;
      onChange({target: {name: 'phone', value: formattedInputValue}});
    };

    const onPhoneKeyDown = (e) => {
      let input = e.target;
      if (e.keyCode === 8 && getInputNumbersValue(input).length === 1) {
        input.value = "";
      }
    };

    const onPhonePaste = (e) => {
      let pasted = e.clipboardData || window.clipboardData;
      let input = e.target;
      let inputNumbersValue = getInputNumbersValue(input);
      if (pasted) {
        let pastedText = pasted.getData("Text");
        let cleanText = pastedText.replace(/\D/g, '');
        input.value = inputNumbersValue + cleanText;
      }
    };

    input.addEventListener("input", onPhoneInput);
    input.addEventListener("keydown", onPhoneKeyDown);
    input.addEventListener("paste", onPhonePaste);

    return () => {
      input.removeEventListener("input", onPhoneInput);
      input.removeEventListener("keydown", onPhoneKeyDown);
      input.removeEventListener("paste", onPhonePaste);
    };
  }, [onChange]);

  return (
    <div className="phone-input-container">
      {label && <label className="label" htmlFor="phone">Телефон:</label>}
      <span className="error" style={{display: error ? 'block' : 'none'}}>{error}</span>
      <input
        ref={inputRef}
        className="input"
        type="text"
        id="phone"
        name="phone"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Ваш номер телефона"
        data-tel-input
      />
    </div>
  );
};

PhoneInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  label: PropTypes.bool,
};

PhoneInput.defaultProps = {
  onBlur: () => {
  },
  error: '',
  label: true,
};