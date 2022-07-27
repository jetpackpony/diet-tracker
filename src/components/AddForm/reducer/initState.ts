import { AddFormReducerState } from "./types";
import { getDateStringForDate } from "./utils";

export const initState = (): AddFormReducerState => {
  return {
    loadedFoodItem: null,
    dateExplicitlyChanged: false,
    fields: {
      title: {
        value: "",
        disabled: false,
        focused: false,
      },
      weight: {
        value: "",
        disabled: false,
      },
      calories: {
        value: "",
        disabled: false,
      },
      protein: {
        value: "",
        disabled: false,
      },
      fat: {
        value: "",
        disabled: false,
      },
      carbs: {
        value: "",
        disabled: false,
      },
      eatenAt: {
        value: getDateStringForDate(),
        disabled: false,
      }
    }
  };
};