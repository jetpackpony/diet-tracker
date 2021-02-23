import React, { useRef, useState } from 'react';

import styles from './Input.module.css';

const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};
const isLabelRaised = (el, type, externalValue) => {
  return (
    // if the element is focused
    el
    && el === document.activeElement
    // if the element is a date field
    || ["datetime-local", "time", "week", "month"].includes(type)
    // if the element's value is not empty
    || (el && el.value || externalValue || "") !== ""
  );
};

const Input = React.forwardRef(({
  labelText,
  suffixText,
  name = "",
  fieldType = "text",
  step = null,
  align = "left",
  value = "",
  disabled = false,
  onInput,
  onChange,
  onClick,
  onFocus,
  onBlur
}, ref) => {
  const localRef = useRef(null);
  const inputRef = ref || localRef;
  const forceUpdate = useForceUpdate();
  const onFocusEvent = () => {
    forceUpdate();
    onFocus && onFocus();
  };
  const onBlurEvent = (e) => {
    forceUpdate();
    onBlur && onBlur();
  };

  const fieldClasses = [styles.field];
  if (isLabelRaised(inputRef.current, fieldType, value)) {
    fieldClasses.push(styles['label-raised']);
  }
  if (suffixText) fieldClasses.push(styles['with-suffix']);
  if (align === "right") fieldClasses.push(styles['align-right']);
  if (disabled) fieldClasses.push(styles['disabled']);

  const onInputLocal = (e) => {
    onInput(e.target.value);
  };
  const onChangeEvent = (e) => {
    onChange(e.target.value);
  };
  const onClickEvent = (e) => {
    if (onClick && typeof onClick === "function") onClick(e);
  };

  return (
    <div className={fieldClasses.join(" ")} onClick={onClickEvent}>
      {
        (onInput || onChange)
          ? (
            <input
              type={fieldType}
              onFocus={onFocusEvent}
              onBlur={onBlurEvent}
              ref={inputRef}
              disabled={disabled}
              name={name}
              step={step}
              value={value}
              onInput={onInput ? onInputLocal : null}
              onChange={onChange ? onChangeEvent : null}
            />
          )
          : (

            <input
              type={fieldType}
              onFocus={onFocusEvent}
              onBlur={onBlurEvent}
              ref={inputRef}
              disabled={disabled}
              name={name}
              step={step}
            />
          )
      }
      <div className={styles.outline}>
        <div className={styles['outline-left']}></div>
        {
          (labelText)
            ? (
              <div className={styles['outline-notch']}>
                <label>{labelText}</label>
              </div>
            )
            : null
        }
        <div className={styles['outline-right']}></div>
      </div>
      {
        (suffixText)
          ? <span className={styles.suffix}>{suffixText}</span>
          : null
      }
    </div>
  );
});

export default Input;