import moment from 'moment';
import { MIN_LENGTH_TO_SEARCH } from './index';

const getDateStringForDate = (date = null) => (
  (date !== null
    ? moment(date)
    : moment()
  ).format("YYYY-MM-DD[T]HH:mm")
);

export const loadFoodItemAction = (foodItem) => ({
  type: "loadFoodItem",
  foodItem
});
export const removeFoodItemAction = () => ({
  type: "removeFoodItem"
});
export const setTitleFocusAction = (value) => ({
  type: "setTitleFocus",
  value
});
export const setFieldValueAction = (name, value) => ({
  type: "setFieldValue",
  name,
  value
});

export const reducer = (state, action) => {
  switch (action.type) {
    case "loadFoodItem":
      return {
        ...setFields(state, {
          title: {
            value: action.foodItem.title,
            disabled: true,
          },
          calories: {
            value: action.foodItem.calories,
            disabled: true,
          },
          protein: {
            value: action.foodItem.protein,
            disabled: true,
          },
          fat: {
            value: action.foodItem.fat,
            disabled: true,
          },
          carbs: {
            value: action.foodItem.carbs,
            disabled: true,
          },
        }),
        loadedFoodItem: action.foodItem
      };
    case "removeFoodItem":
      return {
        ...setFields(state, {
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
    case "setTitleFocus":
      return setFields(state, {
        title: {
          focused: action.value
        }
      });
    case "setFieldValue":
      if (action.name === "eatenAt") {
        return {
          ...setFields(state, {
            [action.name]: {
              value: action.value
            }
          }),
          dateExplicitlyChanged: true
        };
      } else {
        if (state.dateExplicitlyChanged) {
          return setFields(state, {
            [action.name]: {
              value: action.value
            }
          });
        } else {
          // If date has not been explicitly changed, update date
          // on every change of the form
          return setFields(state, {
            [action.name]: {
              value: action.value
            },
            eatenAt: {
              value: getDateStringForDate()
            }
          });
        }
      }

    default:
      throw new Error("Incorrect action type: ", action);
  }
};

export const getFormValues = (state) => {
  const fieldValues = Object.keys(state.fields).reduce((acc, v) => {
    acc[v] = state.fields[v].value;
    return acc;
  }, {});
  return {
    ...fieldValues,
    calories: Number(fieldValues.calories),
    protein: Number(fieldValues.protein),
    fat: Number(fieldValues.fat),
    carbs: Number(fieldValues.carbs),
    weight: Math.floor(Number(fieldValues.weight) || 0),
    eatenAt: moment(fieldValues.eatenAt).toISOString(),
    createdAt: moment().toISOString(),
  };
};

export const getField = (state, name) => {
  return state.fields[name];
};

/**
 * 
 * @param {Object} state 
 * @param {Object} data an object of format 
 * {
 *   fieldName1: { fieldAttr1: value },
 *   fieldName1: { fieldAttr1: value },
 * }
 * @returns 
 */
const setFields = (state, data) => {
  const fields = Object.keys(data).reduce((res, key) => {
    res[key] = {
      ...res[key],
      ...data[key]
    }
    return res;
  }, { ...state.fields });
  return {
    ...state,
    fields
  };
};

export const showSuggestions = (state, isSearching, foundFoodItems) => {
  const title = getField(state, "title");
  return (
    (
      title.focused
      && !title.disabled
      && title.value.length >= MIN_LENGTH_TO_SEARCH
    )
    && (isSearching || foundFoodItems)
  );
};

export const initState = (data) => {
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
