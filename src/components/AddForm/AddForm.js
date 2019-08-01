import React, { useState } from 'react';
import styles from './AddForm.module.css';
import moment from 'moment';

const AddForm = ({ addRecord }) => {
  const [formValues, setFormValues] = useState({});
  const onInputChange = (e) => {
    e.persist();
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const record = {
      ...formValues,
      datetime: moment(formValues.datetime).toISOString()
    };
    console.log("Record: ", record);
    addRecord(record);
  };

  return (
    <form onSubmit={onSubmit}>
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
              value={formValues.title || ""}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className={styles.fieldContainer}>
          <label htmlFor="weight">
            <span>Weight: </span>
          </label>
          <div className={styles.inputContainer}>
            <input type="number" id="weight" name="weight"
              value={formValues.weight || 0}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className={styles.fieldContainer}>
          <label htmlFor="calories">
            <span>Ccal: </span>
          </label>
          <div className={styles.inputContainer}>
            <input type="number" id="calories" name="calories"
              value={formValues.calories || 0}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className={styles.fieldContainer}>
          <label htmlFor="protein">
            <span>Protein: </span>
          </label>
          <div className={styles.inputContainer}>
            <input type="number" id="protein" name="protein"
              value={formValues.protein || 0}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className={styles.fieldContainer}>
          <label htmlFor="fat">
            <span>Fat: </span>
          </label>
          <div className={styles.inputContainer}>
            <input type="number" id="fat" name="fat"
              value={formValues.fat || 0}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className={styles.fieldContainer}>
          <label htmlFor="carbs">
            <span>Net Carbs: </span>
          </label>
          <div className={styles.inputContainer}>
            <input type="number" id="carbs" name="carbs"
              value={formValues.carbs || 0}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className={styles.fieldContainer}>
          <label htmlFor="date">
            <span>Date: </span>
          </label>
          <div className={styles.inputContainer}>
            <input type="datetime-local" id="datetime" name="datetime"
              value={formValues.datetime || moment().format("YYYY-MM-DD[T]HH:mm")}
              onChange={onInputChange}
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