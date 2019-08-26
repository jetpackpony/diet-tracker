import React, { useState, useEffect } from 'react';
import styles from './AddForm.module.css';
import moment from 'moment';
import { useControlledFormHook } from '../../hooks/useForm';
import SuggestionsList from './SuggestionsList';

const MIN_LENGTH_TO_SEARCH = 2;

const getDateStringForDate = (date = null) => (
  (date !== null
    ? moment(date)
    : moment()
  ).format("YYYY-MM-DD[T]HH:mm")
);
const AddForm = ({
  addRecordWithFoodItem,
  addRecord,
  isSearching,
  foundFoodItems,
  searchFoodItem
}) => {
  const {
    initForm,
    getValues,
    resetForm,
    updateValues,
    setDisabled,
    addOnChangeListener
  } = useControlledFormHook(() => null, ["title", "eatenAt"]);

  const [loadedFoodItem, setLoadedFoodItem] = useState(null);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [titleDisabled, setTitleDisabled] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const [eatenAtValue, setEatenAtValue] = useState(getDateStringForDate());
  const [dateExplicitlyChanged, setDateExplicitlyChanged] = useState(false);
  const onEatenAtChange = (e) => {
    setEatenAtValue(e.target.value);
    setDateExplicitlyChanged(true);
  };
  const updateDateField = () => {
    if (!dateExplicitlyChanged) {
      setEatenAtValue(getDateStringForDate());
    }
  };
  addOnChangeListener({ updateDateField });

  const handleTitleChange = (e) => {
    const val = e.target.value;
    if (!loadedFoodItem && val && val.length >= MIN_LENGTH_TO_SEARCH) {
      if (searchTimeout) clearTimeout(searchTimeout);
      setSearchTimeout(setTimeout(() => searchFoodItem(val), 300));
    }
    setTitleValue(val);
    updateDateField();
  };

  const loadFoodItem = (foodItem) => {
    setLoadedFoodItem(foodItem);
    updateValues(foodItem);
    setTitleValue(foodItem.title);
    setTitleDisabled(true);
    setDisabled(Object.keys(foodItem));
  };
  const removeLoadedFoodItem = () =>{
    setLoadedFoodItem(null);
    setTitleValue("");
    setTitleDisabled(false);
    resetForm();
  };

  const submitForm = (e) => {
    e.preventDefault();
    const formValues = getValues();
    const record = {
      ...formValues,
      title: titleValue,
      eatenAt: moment(eatenAtValue).toISOString(),
      createdAt: moment().toISOString(),
    };
    if (loadedFoodItem !== null) {
      record.foodItemID = loadedFoodItem.foodItemID;
      console.log("Record NO food item: ", record);
      addRecord(record);
    } else {
      console.log("Record with food item: ", record);
      addRecordWithFoodItem(record);
    }
    removeLoadedFoodItem();
  };

  return (
    <form onSubmit={submitForm} ref={initForm}>
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
              disabled={titleDisabled}
              value={titleValue}
              onChange={handleTitleChange}
              onFocus={() => { console.log("focused"); setIsTitleFocused(true); }}
              onBlur={() => { console.log("UN focused"); setIsTitleFocused(false); }}
            />
          </div>
          {
            <SuggestionsList
              showSuggestions={isTitleFocused && !titleDisabled && titleValue.length >= MIN_LENGTH_TO_SEARCH}
              isSearching={isSearching}
              foundFoodItems={foundFoodItems}
              onFoodItemSelected={loadFoodItem}
            />
          }
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
            <input type="datetime-local" id="eatenAt" name="eatenAt"
              value={eatenAtValue}
              onChange={onEatenAtChange}
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