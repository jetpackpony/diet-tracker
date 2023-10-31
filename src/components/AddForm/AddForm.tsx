import { useRef, useEffect, useReducer } from "react";
import styles from "./AddForm.module.css";
import SuggestionsList from "./SuggestionsList";
import Input from "../Input";
import Button from "../Button";
import { Close } from "grommet-icons";
import { MIN_LENGTH_TO_SEARCH } from "./index";
import type {
  AddRecordMutationVariables,
  AddRecordWithFoodItemMutationVariables,
  FoodItem,
} from "../../generated/graphql";
import { reducer } from "./reducer";
import { initState } from "./reducer/initState";
import {
  loadFoodItemAction,
  removeFoodItemAction,
  setFieldValueAction,
  setTitleFocusAction,
} from "./reducer/actions";
import { getField, getRecordFromState, showSuggestions } from "./reducer/utils";
import { FormFieldName } from "./reducer/types";

interface AddFormProps {
  addRecordWithFoodItem: (rec: AddRecordWithFoodItemMutationVariables) => void;
  addRecord: (rec: AddRecordMutationVariables) => void;
  isSearching: boolean;
  foundFoodItems?: FoodItem[];
  searchFoodItem: (filter: string) => void;
}

const AddForm = ({
  addRecordWithFoodItem,
  addRecord,
  isSearching,
  foundFoodItems,
  searchFoodItem,
}: AddFormProps) => {
  const [state, dispatch] = useReducer(reducer, {}, initState);

  const titleEl = useRef<HTMLInputElement>(null);
  const weightEl = useRef<HTMLInputElement>(null);
  const searchTimeout = useRef<NodeJS.Timeout>();

  const handleFieldChange = (name: string) => (val: string) => {
    dispatch(setFieldValueAction(name, val));
  };
  const handleTitleChange = (val: string) => {
    if (!state.loadedFoodItem && val && val.length >= MIN_LENGTH_TO_SEARCH) {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      searchTimeout.current = setTimeout(() => searchFoodItem(val), 300);
    }
    dispatch(setFieldValueAction("title", val));
  };
  const handleEatenAtChange = (val: string) => {
    dispatch(setFieldValueAction("eatenAt", val));
  };

  const loadFoodItem = (foodItem: FoodItem) => {
    dispatch(loadFoodItemAction(foodItem));
  };
  const removeLoadedFoodItem = () => {
    dispatch(removeFoodItemAction());
  };

  useEffect(() => {
    setTimeout(() => {
      if (weightEl.current && getField(state, FormFieldName.title).disabled) {
        weightEl.current.focus();
        weightEl.current.select();
      } else if (titleEl.current) {
        titleEl.current.focus();
        titleEl.current.select();
      }
    }, 100);
  }, [getField(state, FormFieldName.title).disabled, state.loadedFoodItem]);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const record = getRecordFromState(state);
    if ("foodItemID" in record) {
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
            disabled={getField(state, FormFieldName.title).disabled}
            value={getField(state, FormFieldName.title).value}
            onChange={handleTitleChange}
            onFocus={() => dispatch(setTitleFocusAction(true))}
            onBlur={() => dispatch(setTitleFocusAction(false))}
          />
          {showSuggestions(state, isSearching, foundFoodItems) && (
            <SuggestionsList
              isSearching={isSearching}
              foundFoodItems={foundFoodItems}
              onFoodItemSelected={loadFoodItem}
            />
          )}
          {state.loadedFoodItem && (
            <Button
              onClick={removeLoadedFoodItem}
              Icon={Close}
              type="outlined"
            />
          )}
        </div>
        <div className={styles.weight}>
          <Input
            name="weight"
            labelText="Weight"
            suffixText="g."
            fieldType="number"
            align="right"
            ref={weightEl}
            disabled={getField(state, FormFieldName.weight).disabled}
            value={getField(state, FormFieldName.weight).value}
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
            disabled={getField(state, FormFieldName.calories).disabled}
            value={getField(state, FormFieldName.calories).value}
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
            disabled={getField(state, FormFieldName.protein).disabled}
            value={getField(state, FormFieldName.protein).value}
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
            disabled={getField(state, FormFieldName.fat).disabled}
            value={getField(state, FormFieldName.fat).value}
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
            disabled={getField(state, FormFieldName.carbs).disabled}
            value={getField(state, FormFieldName.carbs).value}
            onChange={handleFieldChange("carbs")}
          />
        </div>
        <div className={styles.date}>
          <Input
            name="eatenAt"
            labelText="Date"
            fieldType="datetime-local"
            disabled={getField(state, FormFieldName.eatenAt).disabled}
            value={getField(state, FormFieldName.eatenAt).value}
            onChange={handleEatenAtChange}
          />
        </div>
        <div className={styles.submit}>
          <Button
            buttonProps={{ name: "submit", type: "submit" }}
            text="Submit"
          />
        </div>
      </div>
    </form>
  );
};
export default AddForm;
