import React, { useState } from 'react';
import styles from './AddForm.module.css';
import moment from 'moment';
import { useControlledFormHook } from '../../hooks/useForm';

const AddForm = ({ addRecord }) => {
  const {
    initForm,
    getValues,
    resetForm,
    setValues,
    setDisabled
  } = useControlledFormHook();
  const [loadedFoodItem, setLoadedFoodItem] = useState(null);

  const foodItem = {
    "foodItemID": "5d5d1ccca0752f001ecf6a9e",
    "title": "Testme food",
    "calories": 2,
    "protein": 2,
    "fat": 4,
    "carbs": 4
  };
  const loadFoodItem = () => {
    setLoadedFoodItem(foodItem);
    setValues(foodItem);
    setDisabled(Object.keys(foodItem));
  };
  const removeLoadedFoodItem = () =>{
    setLoadedFoodItem(null);
    resetForm();
  };

  const submitForm = (e) => {
    e.preventDefault();
    const formValues = getValues();
    const record = {
      ...formValues,
      eatenAt: moment(formValues.datetime).toISOString(),
      createdAt: moment().toISOString(),
    };
    resetForm();
    removeLoadedFoodItem();
    console.log("Record: ", record);
    addRecord(record);
  };

  return (
    <form onSubmit={submitForm} ref={initForm}>
      <button onClick={(e) => {e.preventDefault(); loadFoodItem()}}>Load food item</button>
      <h1>Add Food</h1>
      {
        loadedFoodItem
          ? (
            <span onClick={removeLoadedFoodItem}>X</span>
          )
          : null
      }
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
};
export default AddForm;