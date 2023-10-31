import React, {
  HTMLInputTypeAttribute,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./Input.module.css";

export type InputFieldValue = string | number;

const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};
const isLabelRaised = (
  el: HTMLInputElement,
  type: HTMLInputTypeAttribute,
  externalValue: InputFieldValue,
) => {
  return (
    // if the element is focused
    (el && el === document.activeElement) ||
    // if the element is a date field
    ["datetime-local", "time", "week", "month"].includes(type) ||
    // if the element's value is not empty
    ((el && el.value) || externalValue || "") !== ""
  );
};

interface InputProps {
  className?: string;
  labelText?: string;
  suffixText?: string;
  name?: string;
  fieldType?: HTMLInputTypeAttribute;
  step?: number;
  align?: "left" | "right";
  value?: InputFieldValue;
  disabled?: boolean;
  onInput?: (value: string) => void;
  onChange?: (value: string) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export type Ref = HTMLInputElement;

const Input = React.forwardRef<Ref, InputProps>(
  (
    {
      className = "",
      labelText,
      suffixText,
      name = "",
      fieldType = "text",
      step,
      align = "left",
      value = "",
      disabled = false,
      onInput,
      onChange,
      onClick,
      onFocus,
      onBlur,
    }: InputProps,
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    // This function is used to initialize both the local ref and a ref passed from parent
    const initRef = (element: HTMLInputElement) => {
      (inputRef as React.MutableRefObject<HTMLInputElement>).current = element;
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };
    const suffixRef = useRef<HTMLSpanElement>(null);
    const forceUpdate = useForceUpdate();
    const onFocusEvent = (e: React.FocusEvent<HTMLInputElement>) => {
      forceUpdate();
      onFocus && onFocus(e);
    };
    const onBlurEvent = (e: React.FocusEvent<HTMLInputElement>) => {
      forceUpdate();
      onBlur && onBlur(e);
    };
    const onClickEvent = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick && onClick(e);
    };

    const fieldClasses = [className, styles.field];
    if (inputRef.current && isLabelRaised(inputRef.current, fieldType, value)) {
      fieldClasses.push(styles["label-raised"]);
    }
    if (suffixText) fieldClasses.push(styles["with-suffix"]);
    if (align === "right") fieldClasses.push(styles["align-right"]);
    if (disabled) fieldClasses.push(styles["disabled"]);

    const [paddingRight, setPaddingRight] = useState(
      `calc(var(--font-size)*0.75*${suffixText ? 2.5 : 1})`,
    );
    useEffect(() => {
      if (suffixRef.current) {
        const width = suffixRef.current.getBoundingClientRect().width;
        setPaddingRight(`calc(var(--font-size) * (0.75 + 0.2) + ${width}px)`);
      }
    }, [suffixText]);

    return (
      <div className={fieldClasses.join(" ")} onClick={onClickEvent}>
        {onInput || onChange ? (
          <input
            style={{ paddingRight }}
            type={fieldType}
            onFocus={onFocusEvent}
            onBlur={onBlurEvent}
            ref={initRef}
            disabled={disabled}
            name={name}
            step={step}
            value={value}
            onInput={
              onInput &&
              ((e: React.ChangeEvent<HTMLInputElement>) =>
                onInput(e.target.value))
            }
            onChange={
              onChange &&
              ((e: React.ChangeEvent<HTMLInputElement>) =>
                onChange(e.target.value))
            }
          />
        ) : (
          <input
            style={{ paddingRight }}
            type={fieldType}
            onFocus={onFocusEvent}
            onBlur={onBlurEvent}
            ref={initRef}
            disabled={disabled}
            name={name}
            step={step}
          />
        )}
        {labelText ? <label>{labelText}</label> : null}
        {suffixText ? (
          <span ref={suffixRef} className={styles.suffix}>
            {suffixText}
          </span>
        ) : null}
      </div>
    );
  },
);

export default Input;
