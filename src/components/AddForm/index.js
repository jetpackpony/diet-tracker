import React from 'react';
import styles from './AddForm.module.css';

const AddForm = () => (
  <form>
    <h1>Add Food</h1>
    <div className={styles.formContainer}>
      <div className={styles.fieldContainer}>
        <label htmlFor="title">
          <span>Food: </span>
        </label>
        <div className={styles.inputContainer}>
          <input type="text" id="title" name="title" placeholder="Enter food" />
        </div>
      </div>

      <div className={styles.fieldContainer}>
        <label htmlFor="weight">
          <span>Weight: </span>
        </label>
        <div className={styles.inputContainer}>
          <input type="number" id="weight" name="weight" />
        </div>
      </div>

      <div className={styles.fieldContainer}>
        <label htmlFor="calories">
          <span>Ccal: </span>
        </label>
        <div className={styles.inputContainer}>
          <input type="number" id="calories" name="calories" />
        </div>
      </div>

      <div className={styles.fieldContainer}>
        <label htmlFor="protein">
          <span>Protein: </span>
        </label>
        <div className={styles.inputContainer}>
          <input type="number" id="protein" name="protein" />
        </div>
      </div>

      <div className={styles.fieldContainer}>
        <label htmlFor="fat">
          <span>Fat: </span>
        </label>
        <div className={styles.inputContainer}>
          <input type="number" id="fat" name="fat" />
        </div>
      </div>

      <div className={styles.fieldContainer}>
        <label htmlFor="carbs">
          <span>Net Carbs: </span>
        </label>
        <div className={styles.inputContainer}>
          <input type="number" id="carbs" name="carbs" />
        </div>
      </div>

      <div className={styles.fieldContainer}>
        <label htmlFor="date">
          <span>Date: </span>
        </label>
        <div className={styles.inputContainer}>
          <input type="date" id="date" name="date" />
        </div>
      </div>

      <div className={styles.fieldContainer}>
        <input type="submit" id="submit" name="submit" value="Submit" />
      </div>
    </div>
  </form>

);

export default AddForm;