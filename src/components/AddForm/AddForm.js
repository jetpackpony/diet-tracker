import React, { useRef, useEffect, useReducer } from 'react';
import styles from './AddForm.module.css';
import SuggestionsList from './SuggestionsList';
import Input from '../Input';
import Button from '../Button';
import { Close } from 'grommet-icons';
import {
  reducer, loadFoodItemAction, removeFoodItemAction, initState,
  setTitleFocusAction, setFieldValueAction, getField, getFormValues,
  showSuggestions
} from './reducer';

import { MIN_LENGTH_TO_SEARCH } from './index';

const AddForm = ({
  addRecordWithFoodItem,
  addRecord,
  isSearching,
  foundFoodItems,
  searchFoodItem
}) => {
  const [state, dispatch] = useReducer(reducer, {}, initState);

  const titleEl = useRef(null);
  const weightEl = useRef(null);
  const searchTimeout = useRef(null);

  const handleFieldChange = (name) => (val) => {
    dispatch(setFieldValueAction(name, val));
  };
  const handleTitleChange = (val) => {
    if (!state.loadedFoodItem && val && val.length >= MIN_LENGTH_TO_SEARCH) {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => searchFoodItem(val), 300);
    }
    dispatch(setFieldValueAction("title", val));
  };
  const handleEatenAtChange = (val) => {
    dispatch(setFieldValueAction("eatenAt", val));
  };

  const loadFoodItem = (foodItem) => {
    dispatch(loadFoodItemAction(foodItem));
  };
  const removeLoadedFoodItem = () => {
    dispatch(removeFoodItemAction());
  };

  useEffect(() => {
    setTimeout(() => {
      if (getField(state, "title").disabled) {
        weightEl.current.focus();
        weightEl.current.select();
      } else {
        titleEl.current.focus();
        titleEl.current.select();
      }
    }, 100);
  }, [getField(state, "title").disabled, state.loadedFoodItem]);

  const submitForm = (e) => {
    e.preventDefault();
    const record = getFormValues(state);
    if (state.loadedFoodItem !== null) {
      record.foodItemID = state.loadedFoodItem.foodItemID;
      console.log("Record NO food item: ", record);
      addRecord(record);
    } else {
      console.log("Record with food item: ", record);
      addRecordWithFoodItem(record);
    }
    removeLoadedFoodItem();
  };

  return (
    <form onSubmit={submitForm}>
      <div className={styles.formContainer}>
        {/* This is to make sure we submitform on enter */}
        <input type="submit" style={{ display: "none" }} />
        <div className={styles.title}>
          <Input
            className={styles.searchBox}
            name="title"
            labelText="Food"
            fieldType="text"
            ref={titleEl}
            disabled={getField(state, "title").disabled}
            value={getField(state, "title").value}
            onChange={handleTitleChange}
            onFocus={() => dispatch(setTitleFocusAction(true))}
            onBlur={() => dispatch(setTitleFocusAction(false))}
          />
          {
            showSuggestions(state, isSearching, foundFoodItems) && (
              <SuggestionsList
                isSearching={isSearching}
                foundFoodItems={foundFoodItems}
                onFoodItemSelected={loadFoodItem}
              />
            )
          }
          {
            state.loadedFoodItem && (
              <Button onClick={removeLoadedFoodItem} icon={Close} type="outlined" />
            )
          }
        </div>
        <div className={styles.weight}>
          <Input
            name="weight"
            labelText="Weight"
            suffixText="g."
            fieldType="number"
            align="right"
            ref={weightEl}
            disabled={getField(state, "weight").disabled}
            value={getField(state, "weight").value}
            onChange={handleFieldChange("weight")}
          />
        </div>
        <div className={styles.cal}>
          <Input
            name="calories"
            labelText="Calories"
            suffixText="cal"
            fieldType="number"
            align="right"
            disabled={getField(state, "calories").disabled}
            value={getField(state, "calories").value}
            onChange={handleFieldChange("calories")}
          />
        </div>
        <div className={styles.protein}>
          <Input
            name="protein"
            labelText="Protein"
            suffixText="g."
            fieldType="number"
            step={0.1}
            align="right"
            disabled={getField(state, "protein").disabled}
            value={getField(state, "protein").value}
            onChange={handleFieldChange("protein")}
          />
        </div>
        <div className={styles.fat}>
          <Input
            name="fat"
            labelText="Fat"
            suffixText="g."
            fieldType="number"
            step={0.1}
            align="right"
            disabled={getField(state, "fat").disabled}
            value={getField(state, "fat").value}
            onChange={handleFieldChange("fat")}
          />
        </div>
        <div className={styles.carbs}>
          <Input
            name="carbs"
            labelText="Carbs"
            suffixText="g."
            fieldType="number"
            step={0.1}
            align="right"
            disabled={getField(state, "carbs").disabled}
            value={getField(state, "carbs").value}
            onChange={handleFieldChange("carbs")}
          />
        </div>
        <div className={styles.date}>
          <Input
            name="eatenAt"
            labelText="Date"
            fieldType="datetime-local"
            disabled={getField(state, "eatenAt").disabled}
            value={getField(state, "eatenAt").value}
            onChange={handleEatenAtChange}
          />
        </div>
        <div className={styles.submit}>
          <Button buttonProps={{ name: "submit", type: "submit" }} text="Submit" />
        </div>
      </div>
    </form>
  );
};
export default AddForm;