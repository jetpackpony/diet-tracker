import { FoodItem } from "../../../generated/graphql";

// export type FormFieldName = keyof AddFormReducerState["fields"];

export enum FormFieldName {
  title = "title",
  weight = "weight",
  calories = "calories",
  protein = "protein",
  fat = "fat",
  carbs = "carbs",
  eatenAt = "eatenAt",
}

export const isFormFieldName = (name: any): name is FormFieldName => {
  return Object.values(FormFieldName).includes(name);
};

export interface FormField {
  value: string;
  disabled: boolean;
  focused?: boolean;
}

export interface AddFormReducerState {
  loadedFoodItem: FoodItem | null;
  dateExplicitlyChanged: boolean;
  fields: {
    [key in FormFieldName]: FormField;
  };
}

export type FormFieldData = {
  [key in FormFieldName]?: FormField;
};

export enum ActionType {
  loadFoodItem = "loadFoodItem",
  removeFoodItem = "removeFoodItem",
  setTitleFocus = "setTitleFocus",
  setFieldValue = "setFieldValue",
  errorAction = "errorAction",
}

export interface LoadFoodItemAction {
  type: ActionType.loadFoodItem;
  foodItem: FoodItem;
}

export interface RemoveFoodItemAction {
  type: ActionType.removeFoodItem;
}

export interface SetTitleFocusAction {
  type: ActionType.setTitleFocus;
  value: boolean;
}

export interface SetFieldValueAction {
  type: ActionType.setFieldValue;
  name: FormFieldName;
  value: string;
}

export interface ErrorAction {
  type: ActionType.errorAction;
  message: string;
}

export type Action =
  | LoadFoodItemAction
  | RemoveFoodItemAction
  | SetTitleFocusAction
  | SetFieldValueAction
  | ErrorAction;
