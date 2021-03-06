import { mapObjArray } from '../utils';
import { useRef, useState } from 'react';

export const getFormControls = (form) => {
  const res = [];
  for(let i = 0; i < form.elements.length; i++) {
    res.push(form.elements[i]);
  }
  return res;
};

const getInputsValues = (inputs) => {
  return inputs.reduce((res, input) => {
    if (input.nodeName !== "INPUT") {
      return res;
    }
    const val = input.value;
    res[input.name] = input.type === "number" ? Number(val) : val;
    return res;
  }, {});
};

export const useUncontrolledFormHook = (callback) => {
  const formElement = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const values = getInputsValues(
      getFormControls(formElement.current)
    );
    callback(values, e);
  };

  const initForm = (form) => {
    formElement.current = form;
  };

  return {
    onSubmit, initForm
  };
};

const filterValueInputs = ({ name, tagName }) => name && tagName === "INPUT";

export const useControlledFormHook = (onSubmitCallback, omit = []) => {
  const [values, setValues] = useState(null);
  const prevEventListener = useRef(null);
  const formRef = useRef(null);
  const omitRef = useRef(omit);
  const changeListenersRef = useRef({});

  const handleInputChange = (e) => {
    setValues((formValues) => {
      let { value, name } = e.target;
      if (value === "" && e.data === "-") {
        value = "-";
      }
      return {
        ...formValues,
        [name]: value
      };
    });
    Object.keys(changeListenersRef.current)
      .forEach((key) => changeListenersRef.current[key]());
  };

  const initForm = (form) => {
    if (!form) return;
    formRef.current = form;

    if (values === null) {
      resetForm();
    } else {
      getFormControls(formRef.current)
        .filter(filterValueInputs)
        .filter(({name}) => !omitRef.current.includes(name))
        .forEach((input) => {
          // This check allows us to enter negative numbers in the number inputs
          if (input.type !== "number" || values[input.name] !== "-") {
            input.value = values[input.name];
          }
          input.removeEventListener("input", prevEventListener.current);
          input.addEventListener("input", handleInputChange);
        });
      prevEventListener.current = handleInputChange;
    }
  };

  const resetForm = () => {
    setValues(
      getFormControls(formRef.current)
        .filter(filterValueInputs)
        .filter(({name}) => !omitRef.current.includes(name))
        .reduce((res, input) => {
          input.disabled = false;
          res[input.name] = input.defaultValue;
          return res;
        }, {})
    )
  };

  const setDisabled = (inputs) => {
    getFormControls(formRef.current)
      .filter((input) => inputs.includes(input.name))
      .filter(({ name }) => !omit.includes(name))
      .forEach((input) => {
        input.disabled = true;
      });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitCallback(values, resetForm, e);
  };

  const getValues = () => {
    return mapObjArray((k, v) => Number(v), values);
  }

  const updateValues = (newValues) => (
    setValues((oldValues) => ({
      ...oldValues,
      ...newValues
    }))
  );

  const addOnChangeListener = (listener) => {
    changeListenersRef.current = {
      ...changeListenersRef.current,
      ...listener
    };
  };

  return {
    initForm,
    onSubmit,
    resetForm,
    updateValues,
    setDisabled,
    getValues,
    addOnChangeListener
  };
};