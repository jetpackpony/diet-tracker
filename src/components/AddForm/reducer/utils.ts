import moment, { MomentInput } from "moment";
import { MIN_LENGTH_TO_SEARCH } from "..";
import {
  AddRecordMutationVariables,
  AddRecordWithFoodItemMutationVariables,
  FoodItem,
} from "../../../generated/graphql";
import { AddFormReducerState, FormField, FormFieldName } from "./types";

export const showSuggestions = (
  state: AddFormReducerState,
  isSearching: boolean,
  foundFoodItems: FoodItem[] | undefined,
): boolean => {
  const title = getField(state, FormFieldName.title);
  return (
    !!title.focused &&
    !title.disabled &&
    title.value.length >= MIN_LENGTH_TO_SEARCH &&
    (isSearching || !!foundFoodItems)
  );
};

export const getField = (
  state: AddFormReducerState,
  name: FormFieldName,
): FormField => {
  return state.fields[name];
};

export const getRecordFromState = (
  state: AddFormReducerState,
): AddRecordMutationVariables | AddRecordWithFoodItemMutationVariables => {
  if (state.loadedFoodItem) {
    return {
      foodItemID: state.loadedFoodItem.id,
      weight: Math.floor(Number(state.fields.weight.value) || 0),
      eatenAt: moment(state.fields.eatenAt.value).toISOString(),
      createdAt: moment().toISOString(),
    };
  } else {
    return {
      title: state.fields.title.value,
      calories: Number(state.fields.calories.value),
      protein: Number(state.fields.protein.value),
      fat: Number(state.fields.fat.value),
      carbs: Number(state.fields.carbs.value),
      weight: Math.floor(Number(state.fields.weight.value) || 0),
      eatenAt: moment(state.fields.eatenAt.value).toISOString(),
      createdAt: moment().toISOString(),
    };
  }
};

export const getDateStringForDate = (date: MomentInput | null = null) =>
  (date !== null ? moment(date) : moment()).format("YYYY-MM-DD[T]HH:mm");
