import React, { useState } from 'react';
import styles from './AddForm.module.css';
import moment from 'moment';
import { useControlledFormHook } from '../../hooks/useForm';

const AddForm = ({ addRecord }) => {
  const submitForm = (formValues, resetForm) => {
    const record = {
      ...formValues,
      eatenAt: moment(formValues.datetime).toISOString(),
      createdAt: moment().toISOString(),
    };
    resetForm();
    console.log("Record: ", record);
    addRecord(record);
  };

  const { initForm, onSubmit } = useControlledFormHook(submitForm);

  return (
    <form onSubmit={onSubmit} ref={initForm}>
      <h1>Add Food</h1>
      <div className={styles.formContainer}>
        <div className={styles.fieldContainer}>
          <label htmlFor="title">
            <span>Food: </span>
          </label>
          <div className={styles.inputContainer}>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue=""
            />
          </div>
        </div>

        <div className={styles.fieldContainer}>
          <label htmlFor="weight">
            <span>Weight: </span>
          </label>
          <div className={styles.inputContainer}>
            <input type="number" id="weight" name="weight"
              defaultValue={0}
            />
          </div>
        </div>

        <div className={styles.fieldContainer}>
          <label htmlFor="calories">
            <span>Ccal: </span>
          </label>
          <div className={styles.inputContainer}>
            <input type="number" id="calories" name="calories"
              defaultValue={0}
            />
          </div>
        </div>

        <div className={styles.fieldContainer}>
          <label htmlFor="protein">
            <span>Protein: </span>
          </label>
          <div className={styles.inputContainer}>
            <input type="number" id="protein" name="protein"
              defaultValue={0}
            />
          </div>
        </div>

        <div className={styles.fieldContainer}>
          <label htmlFor="fat">
            <span>Fat: </span>
          </label>
          <div className={styles.inputContainer}>
            <input type="number" id="fat" name="fat"
              defaultValue={0}
            />
          </div>
        </div>

        <div className={styles.fieldContainer}>
          <label htmlFor="carbs">
            <span>Net Carbs: </span>
          </label>
          <div className={styles.inputContainer}>
            <input type="number" id="carbs" name="carbs"
              defaultValue={0}
            />
          </div>
        </div>

        <div className={styles.fieldContainer}>
          <label htmlFor="date">
            <span>Date: </span>
          </label>
          <div className={styles.inputContainer}>
            <input type="datetime-local" id="datetime" name="datetime"
              defaultValue={moment().format("YYYY-MM-DD[T]HH:mm")}
            />
          </div>
        </div>

        <div className={styles.fieldContainer}>
          <button type="submit" id="submit" name="submit">Submit</button>
        </div>
      </div>
    </form>

  );
}


export default AddForm;