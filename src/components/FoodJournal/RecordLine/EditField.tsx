import React, { useRef, useState } from "react";
import styles from "./EditField.module.css";
import Input, { InputFieldValue } from "../../Input";

interface EditFieldProps {
  weight: number;
  onUpdate: (weight: number) => void;
}

const EditField = ({ weight, onUpdate }: EditFieldProps) => {
  const [value, setValue] = useState<InputFieldValue>(weight);
  const inputEl = useRef<HTMLInputElement>(null);
  const onInput = (val: string) => setValue(val);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    if (inputEl.current) {
      inputEl.current.blur();
    }
    onUpdate(Number(value) || 0);
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (inputEl.current) {
      inputEl.current.focus();
      inputEl.current.select();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.formContainer}>
        <Input
          fieldType="number"
          value={value}
          onInput={onInput}
          onChange={onInput}
          suffixText="g."
          align="right"
          onClick={onClick}
          ref={inputEl}
        />
      </div>
    </form>
  );
};

export default EditField;
