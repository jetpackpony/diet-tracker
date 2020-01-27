import React, { useEffect, useRef } from 'react';
import styles from './EditField.module.css';
import { Checkmark } from 'grommet-icons';
import Button from '../../Button';
import inputStyles from '../../Input/Input.module.css';
import { useUncontrolledFormHook } from '../../../hooks/useForm';

const EditField = ({ weight, onUpdate }) => {
  const inputEl = useRef(null);
  const submitForm = (values, event) => {
    event.target.reset();
    onUpdate({ weight: values.weight });
  }
  const { onSubmit, initForm } = useUncontrolledFormHook(submitForm);

  useEffect(() => {
    inputEl.current.focus();
    inputEl.current.select();
  }, []);

  return (
    <form onSubmit={onSubmit} ref={initForm}>
      <input
        ref={inputEl}
        className={[inputStyles.input, styles.editingInput].join(" ")}
        type="number"
        name="weight"
        defaultValue={weight}
      />
      g.
      <Button className={[styles.save].join(" ")}>
        <Checkmark size="small" color="green" />
        <span> Save</span>
      </Button>
    </form>
  );
};

export default EditField;