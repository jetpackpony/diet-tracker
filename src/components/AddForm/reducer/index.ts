import { Action, ActionType, AddFormReducerState, FormFieldData, FormFieldName } from './types';
import { getDateStringForDate } from './utils';

export const reducer = (
  state: AddFormReducerState,
  action: Action
): AddFormReducerState => {
  switch (action.type) {
    case ActionType.loadFoodItem:
      return {
        ...state,
        fields: setFields(state.fields, {
          title: {
            value: action.foodItem.title,
            disabled: true,
          },
          calories: {
            value: action.foodItem.calories.toString(),
            disabled: true,
          },
          protein: {
            value: action.foodItem.protein.toString(),
            disabled: true,
          },
          fat: {
            value: action.foodItem.fat.toString(),
            disabled: true,
          },
          carbs: {
            value: action.foodItem.carbs.toString(),
            disabled: true,
          },
        }),
        loadedFoodItem: action.foodItem
      };
    case ActionType.removeFoodItem:
      return {
        ...state,
        fields: setFields(state.fields, {
          title: {
            value: "",
            disabled: false,
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
        }),
        loadedFoodItem: null
      };
    case ActionType.setTitleFocus:
      return {
        ...state,
        fields: setFields(state.fields, {
          title: {
            ...state.fields.title,
            focused: action.value
          }
        })
      };
    case ActionType.setFieldValue:
      if (action.name === "eatenAt") {
        return {
          ...state,
          fields: setFields(state.fields, {
            [action.name]: {
              ...state.fields[action.name],
              value: action.value
            }
          }),
          dateExplicitlyChanged: true
        };
      } else {
        if (state.dateExplicitlyChanged) {
          return {
            ...state,
            fields: setFields(state.fields, {
              [action.name]: {
                ...state.fields[action.name],
                value: action.value
              }
            })
          };
        } else {
          // If date has not been explicitly changed, update date
          // on every change of the form
          return {
            ...state,
            fields: setFields(state.fields, {
              [action.name]: {
                ...state.fields[action.name],
                value: action.value
              },
              eatenAt: {
                ...state.fields.eatenAt,
                value: getDateStringForDate()
              }
            })
          };
        }
      }
    case ActionType.errorAction:
      console.log(action.message);
      return state;
    default:
      throw new Error("Incorrect action type: ", action);
  }
};

const setFields = (
  fields: AddFormReducerState["fields"],
  data: FormFieldData
): AddFormReducerState["fields"] => {
  const keys = Object.keys(data) as (keyof FormFieldData)[];
  return keys.reduce((res, key) => {
    res[key] = {
      ...res[key],
      ...data[key]
    }
    return res;
  }, { ...fields });
};
