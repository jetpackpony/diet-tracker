import React, { useRef, useState } from 'react';
import styles from './EditField.module.css';
import { Checkmark } from 'grommet-icons';
import Button from '../../Button';
import Input from "../../Input";

const EditField = ({ weight, onUpdate }) => {
  const [value, setValue] = useState(weight);
  const inputEl = useRef(null);
  const onInput = (val) => setValue(val);
  const onSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    inputEl.current.blur();
    onUpdate({ weight: Number(value) });
  }

  const onClick = (e) => {
    inputEl.current.focus();
    inputEl.current.select();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.formContainer}>
        <Input
          fieldType="number"
          value={value}
          controlled={true}
          onInput={onInput}
          onChange={onInput}
          suffixText="g."
          align="right"
          onClick={onClick}
          ref={inputEl}
        />
        <Button className={styles.save}>
          <Checkmark size="small" color="green" />
        </Button>
      </div>
    </form>
  );
};

export default EditField;