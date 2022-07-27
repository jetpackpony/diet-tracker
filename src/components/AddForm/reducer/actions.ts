import { FoodItem } from "../../../generated/graphql";
import { ActionType, ErrorAction, isFormFieldName } from "./types";
import {
  FormFieldName, LoadFoodItemAction,
  RemoveFoodItemAction, SetFieldValueAction, SetTitleFocusAction
} from "./types";

export const loadFoodItemAction = (foodItem: FoodItem): LoadFoodItemAction => ({
  type: ActionType.loadFoodItem,
  foodItem
});

export const removeFoodItemAction = (): RemoveFoodItemAction => ({
  type: ActionType.removeFoodItem
});

export const setTitleFocusAction = (value: boolean): SetTitleFocusAction => ({
  type: ActionType.setTitleFocus,
  value
});

export const setFieldValueAction = (
  name: string,
  value: string
): SetFieldValueAction | ErrorAction => {
  if (!isFormFieldName(name)) {
    return {
      type: ActionType.errorAction,
      message: `Wrong field name: ${name}`
    }
  } else {
    return {
      type: ActionType.setFieldValue,
      name,
      value
    };
  }
};

export const errorAction = () => ({

});
