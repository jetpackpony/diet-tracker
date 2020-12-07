import React, { useState, useRef, useEffect } from 'react';
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

  const titleInput = useRef(null);
  const weightInput = useRef(null);

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

  const changeTitleWithSearch = (val) => {
    if (!loadedFoodItem && val && val.length >= MIN_LENGTH_TO_SEARCH) {
      if (searchTimeout) clearTimeout(searchTimeout);
      setSearchTimeout(setTimeout(() => searchFoodItem(val), 300));
    }
    setTitleValue(val);
    updateDateField();
  };
  const handleTitleChange = (e) => {
    changeTitleWithSearch(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      if (titleDisabled) {
        weightInput.current.focus();
        weightInput.current.select();
      } else {
        titleInput.current.focus();
        titleInput.current.select();
      }
    }, 100);
  }, [titleDisabled, loadedFoodItem]);

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
      weight: Math.floor(Number(formValues.weight) || 0),
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

  const onPaste = (e) => {
    const regExp = /^(.+)((?:\s+(?:\d+(?:\.\d+)?)){5})$/;
    const text = e.clipboardData.getData("text");
    const res = text.match(regExp);
    if (res) {
      e.preventDefault();
      e.stopPropagation();
      const title = res[1].trim();
      const [
        weight,
        calories,
        protein,
        fat,
        carbs
      ] = res[2].trim().split(/\s+/);
      updateValues({
        title,
        weight: Number(weight),
        calories: Number(calories),
        protein: Number(protein),
        fat: Number(fat),
        carbs: Number(carbs)
      });
      changeTitleWithSearch(title);
      titleInput.current.focus();
    }
  };

  return (
    <form onSubmit={submitForm} ref={initForm} onPaste={onPaste}>
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
              ref={titleInput}
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
            <input type="text" id="weight" name="weight"
              ref={weightInput}
              defaultValue={""}
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
            <input type="number" step={0.1} id="protein" name="protein"
              defaultValue={0}
            />
          </div>
        </div>

        <div className={styles.fieldContainer}>
          <label htmlFor="fat">
            <span>Fat: </span>
          </label>
          <div className={styles.inputContainer}>
            <input type="number" step={0.1} id="fat" name="fat"
              defaultValue={0}
            />
          </div>
        </div>

        <div className={styles.fieldContainer}>
          <label htmlFor="carbs">
            <span>Net Carbs: </span>
          </label>
          <div className={styles.inputContainer}>
            <input type="number" step={0.1} id="carbs" name="carbs"
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